import { InvalidGenerateRefreshTokenErrorResponse } from '@application/handlers/UseCasesResponses/RefreshToken/IGenerateRefreshTokenHandler';
import dayjs from 'dayjs';
import { IGenerateRefreshTokenUseCase } from '@application/useCases/RefreshToken/GenerateRefreshToken/IGenerateRefreshTokenUseCase';
import { ITokenService } from '@domain/services/ITokenService';
import { IRefreshAccessTokenDTO } from './IRefreshAccessTokenDTO';
import { RefreshToken } from '@domain/entities/RefreshToken';
import {
  InvalidRefreshTokenNotFoundErrorResponse,
  InvalidRefreshTokenUserNotFoundErrorResponse,
  RefreshAccessTokenResponse,
} from '@application/handlers/UseCasesResponses/RefreshToken/IRefreshAccessTokenHandler';
import { IGenerateRefreshTokenDTO } from '@application/useCases/RefreshToken/GenerateRefreshToken/IGenerateRefreshTokenDTO';
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
    this.secret_key = process.env.SECRET_KEY as string;
  }

  async execute(
    {
      public_id
    }: IRefreshAccessTokenDTO
  ): Promise<
    | InvalidRefreshTokenNotFoundErrorResponse
    | InvalidRefreshTokenUserNotFoundErrorResponse
    | RefreshAccessTokenResponse
  > {
    const refreshToken: RefreshToken | null =
      await this.iRefreshTokenRepository.findRefreshToken(public_id);

    if (!refreshToken) return new InvalidRefreshTokenNotFoundErrorResponse();

    const user: User | null =
      await this.iUserRepository.findUserById(
        refreshToken.user_id
      );

    if (!user) return new InvalidRefreshTokenUserNotFoundErrorResponse();

    const { name, surname, email, role, is_active } = user;

    const accessToken: string = this.iTokenService.sign({
      payload: {
        content: user.public_id
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
        | InvalidGenerateRefreshTokenErrorResponse
        | RefreshToken = await this.iGenerateRefreshTokenUseCase.execute(DTO);

      return {
        access_token: accessToken,
        refresh_token: newRefreshToken as RefreshToken,
        user: {
          name: name,
          surname: surname,
          email: email,
          role: role,
          is_active: is_active,
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
        is_active: is_active,
      }
    };
  }
}
