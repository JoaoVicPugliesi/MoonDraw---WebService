import { ILogoutDTO } from './ILogoutDTO';
import { RefreshToken } from '@domain/entities/RefreshToken';
import { InvalidRefreshTokenNotFoundErrorResponse } from '@application/handlers/UseCasesResponses/User/ILogoutHandlers';
import { IRefreshTokenRepository } from '@domain/repositories/IRefreshTokenRepository';

export class ILogoutUseCase {
  constructor(
    private readonly iRefreshTokenRepository: IRefreshTokenRepository
  ) {}

  async execute({
    public_id,
  }: ILogoutDTO): Promise<InvalidRefreshTokenNotFoundErrorResponse | void> {
    const refreshToken: RefreshToken | null =
      await this.iRefreshTokenRepository.findRefreshToken(public_id);

    if (!refreshToken) return new InvalidRefreshTokenNotFoundErrorResponse();

    await this.iRefreshTokenRepository.deleteRelatedRefreshTokens(refreshToken.user_id);
  }
}
