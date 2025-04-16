import { InvalidGenerateRefreshTokenErrorResponse } from '@application/handlers/UseCasesResponses/RefreshToken/IGenerateRefreshTokenHandler';
import { RefreshToken } from '@prisma/client';
import { IGenerateRefreshTokenDTO } from './IGenerateRefreshTokenDTO';
import { IGenerateRefreshTokenRepo } from '@domain/repositories/RefreshToken/IGenerateRefreshTokenRepo';

export class IGenerateRefreshTokenUseCase {
  constructor(
    private readonly iGenerateRefreshTokenRepo: IGenerateRefreshTokenRepo
  ) {}

  async execute({
    user_id,
  }: IGenerateRefreshTokenDTO): Promise<
    InvalidGenerateRefreshTokenErrorResponse | RefreshToken
  > {
    const relatedTokens: RefreshToken | RefreshToken[] | null =
      await this.iGenerateRefreshTokenRepo.findRelatedRefreshTokens(
        user_id
      );

    if (relatedTokens) {
      await this.iGenerateRefreshTokenRepo.deleteRelatedRefreshTokens(
        user_id
      );
    }

    const refreshToken: RefreshToken | null =
      await this.iGenerateRefreshTokenRepo.saveRefreshToken({
        user_id
      });

    if (!refreshToken) return new InvalidGenerateRefreshTokenErrorResponse();

    return refreshToken;
  }
}
