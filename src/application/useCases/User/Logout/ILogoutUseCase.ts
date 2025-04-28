import { ILogoutDTO, RefreshTokenNotFoundErrorResponse } from './ILogoutDTO';
import { RefreshToken } from '@domain/entities/RefreshToken';
import { IRefreshTokenRepository } from '@domain/repositories/IRefreshTokenRepository';

export class ILogoutUseCase {
  constructor(
    private readonly iRefreshTokenRepository: IRefreshTokenRepository
  ) {}

  async execute({
    public_id,
  }: ILogoutDTO): Promise<RefreshTokenNotFoundErrorResponse | void> {
    const refreshToken: RefreshToken | null =
      await this.iRefreshTokenRepository.findRefreshToken(public_id);

    if (!refreshToken) return new RefreshTokenNotFoundErrorResponse();

    await this.iRefreshTokenRepository.deleteRelatedRefreshTokens(refreshToken.user_id);
  }
}
