import dayjs from 'dayjs';
import { IGenerateRefreshTokenUseCase } from '@application/useCases/RefreshToken/GenerateRefreshToken/IGenerateRefreshTokenUseCase';
import { ITokenService } from '@domain/services/Token/ITokenService';
import { IRefreshAccessTokenDTO, RefreshAccessTokenResponse, RefreshTokenNotFoundErrorResponse, RefreshTokenUserNotFoundErrorResponse } from './IRefreshAccessTokenDTO';
import { RefreshToken } from '@domain/entities/RefreshToken';
import { GenerateRefreshTokenErrorResponse, IGenerateRefreshTokenDTO } from '@application/useCases/RefreshToken/GenerateRefreshToken/IGenerateRefreshTokenDTO';
import { User } from '@domain/entities/User';
import { IRefreshTokenRepository } from '@domain/repositories/IRefreshTokenRepository';
import { IUserRepository } from '@domain/repositories/IUserRepository';

export class IRefreshAccessTokenUseCase {
  private readonly secret_key: string;

  constructor(
    private readonly iRefreshTokenRepository: IRefreshTokenRepository,
    private readonly iUserRepository: IUserRepository,
    private readonly iGenerateRefreshTokenUseCase: IGenerateRefreshTokenUseCase,
    private readonly iTokenService: ITokenService
  ) {
    this.secret_key = process.env.JWT_SECRET_KEY!;
  }

  async execute(
    {
      public_id
    }: IRefreshAccessTokenDTO
  ): Promise<
    | RefreshTokenNotFoundErrorResponse
    | RefreshTokenUserNotFoundErrorResponse
    | RefreshAccessTokenResponse
  > {
    const refreshToken: RefreshToken | null =
      await this.iRefreshTokenRepository.findRefreshToken(public_id);

    if (!refreshToken) return new RefreshTokenNotFoundErrorResponse();

    const user: User | null =
      await this.iUserRepository.findUserById({
        public_id: refreshToken.user_id
      });

    if (!user) return new RefreshTokenUserNotFoundErrorResponse();

    const { 
      name, 
      surname, 
      email, 
      role, 
      is_email_verified 
    } = user;
    
    await this.iUserRepository.trackUserActivity({
      email
    });
    
    const accessToken: string = this.iTokenService.sign({
      payload: {
        content: {
          public_id: user.public_id,
          role: role,
          is_email_verified: is_email_verified
        }
      },
      secret_key: this.secret_key,
      options: {
        expiresIn: '1h',
      },
    });

    const refreshTokenExpired: boolean = dayjs().isAfter(
      dayjs.unix(refreshToken.expires_in)
    );

    if (refreshTokenExpired) {
      await this.iRefreshTokenRepository.deleteRelatedRefreshTokens(
        refreshToken.user_id
      );
      const DTO: IGenerateRefreshTokenDTO = {
        user_id: refreshToken.user_id,
      };
      const newRefreshToken:
        | GenerateRefreshTokenErrorResponse
        | RefreshToken = await this.iGenerateRefreshTokenUseCase.execute(DTO);

      return {
        access_token: accessToken,
        refresh_token: newRefreshToken as RefreshToken,
        user: {
          name: name,
          surname: surname,
          email: email,
          role: role,
          is_email_verified: is_email_verified,
        }
      };
    }

    return {
      access_token: accessToken,
      user: {
        name: name,
        surname: surname,
        email: email,
        role: role,
        is_email_verified: is_email_verified,
      }
    }
  }
}