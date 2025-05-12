import { User } from '@domain/entities/User';
import { GenerateRefreshTokenErrorResponse, IGenerateRefreshTokenDTO, IGenerateRefreshTokenResponse } from '@application/useCases/RefreshToken/GenerateRefreshToken/IGenerateRefreshTokenDTO';
import { IGenerateRefreshTokenUseCase } from '@application/useCases/RefreshToken/GenerateRefreshToken/IGenerateRefreshTokenUseCase';
import { IHashService } from '@domain/services/Hash/IHashService';
import { ITokenService } from '@domain/services/Token/ITokenService';
import { ILoginDTO, ILoginResponse, PasswordIsNotEqualErrorResponse, UserNotFoundErrorResponse } from './ILoginDTO';
import { IUserRepository } from '@domain/repositories/IUserRepository';

export class ILoginUseCase {
  constructor(
    private readonly iUserRepository: IUserRepository,
    private readonly iHashService: IHashService,
    private readonly iTokenService: ITokenService,
    private readonly iGenerateRefreshTokenUseCase: IGenerateRefreshTokenUseCase,
  ) {}

  async execute(
    {
      email,
      password
    }: ILoginDTO
  ): Promise<ILoginResponse> {
    const user: User | null = await this.iUserRepository.findUserByEmail({
      email
    });
    
    if (!user) return new UserNotFoundErrorResponse();

    const isPasswordEqual: boolean = await this.iHashService.compare(
      password,
      user.password
    );
    if (!isPasswordEqual) return new PasswordIsNotEqualErrorResponse();
    
    await this.iUserRepository.trackUserActivity({
      email
    });
    
    const { public_id, icon_id, name, surname, description, role, is_email_verified } = user;

    const accessToken: string = this.iTokenService.sign({
      payload: {
        content: {
          public_id: public_id,
          role: role,
          is_email_verified: is_email_verified
        }
      },
      secret_key: process.env.JWT_SECRET_KEY!,
      options: {
        expiresIn: '1h',
      },
    });

    const iGenerateRefreshTokenDTO: IGenerateRefreshTokenDTO = {
      owner_id: public_id
    };
    
    const response: IGenerateRefreshTokenResponse =
      await this.iGenerateRefreshTokenUseCase.execute(iGenerateRefreshTokenDTO);

    if (response instanceof GenerateRefreshTokenErrorResponse) {
      return new GenerateRefreshTokenErrorResponse();
    }
    
    return {
      access_token: accessToken,
      refresh_token: response.refreshToken,
      user: {
        icon_id: icon_id,
        name: name,
        surname: surname,
        email: email,
        description: description
      }
    };
  }
}
