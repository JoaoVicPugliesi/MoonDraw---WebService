import { User } from '@domain/entities/User';
import { IGenerateRefreshTokenDTO } from '@application/useCases/RefreshToken/GenerateRefreshToken/IGenerateRefreshTokenDTO';
import { IGenerateRefreshTokenUseCase } from '@application/useCases/RefreshToken/GenerateRefreshToken/IGenerateRefreshTokenUseCase';
import { IHashService } from '@domain/services/Hash/IHashService';
import { ITokenService } from '@domain/services/Token/ITokenService';
import { ILoginDTO } from './ILoginDTO';
import {
  UserNotFoundErrorResponse,
  PasswordIsNotEqualErrorResponse,
  ILoginResponse,
} from '@application/handlers/UseCasesResponses/User/ILoginHandlers';
import { RefreshToken } from '@domain/entities/RefreshToken';
import { GenerateRefreshTokenErrorResponse } from '@application/handlers/UseCasesResponses/RefreshToken/IGenerateRefreshTokenHandler';
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
  ): Promise<
    | UserNotFoundErrorResponse
    | PasswordIsNotEqualErrorResponse
    | GenerateRefreshTokenErrorResponse
    | ILoginResponse
  > {
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
    
    const { public_id, name, surname, role, is_verified } = user;

    const accessToken: string = this.iTokenService.sign({
      payload: {
        content: {
          public_id: public_id,
          role: role,
          is_verified: is_verified
        }
      },
      secret_key: process.env.JWT_SECRET_KEY!,
      options: {
        expiresIn: '1h',
      },
    });

    const iGenerateRefreshTokenDTO: IGenerateRefreshTokenDTO = {
      user_id: public_id
    };
    
    const refreshToken: GenerateRefreshTokenErrorResponse | RefreshToken =
      await this.iGenerateRefreshTokenUseCase.execute(iGenerateRefreshTokenDTO);

    if (refreshToken instanceof GenerateRefreshTokenErrorResponse) {
      return new GenerateRefreshTokenErrorResponse();
    }
    
    return {
      access_token: accessToken,
      refresh_token: refreshToken,
      user: {
        name: name,
        surname: surname,
        email: email,
        role: role,
        is_verified: is_verified,
      }
    };
  }
}
