import { RefreshToken } from '@prisma/client';
import { GenerateRefreshTokenErrorResponse, IGenerateRefreshTokenDTO } from './IGenerateRefreshTokenDTO';
import { IRefreshTokenRepository } from '@domain/repositories/IRefreshTokenRepository';

export class IGenerateRefreshTokenUseCase {
  constructor(
    private readonly iRefreshTokenRepository: IRefreshTokenRepository
  ) {}

  async execute({
    owner_id,
  }: IGenerateRefreshTokenDTO): Promise<
    GenerateRefreshTokenErrorResponse | RefreshToken
  > {
    const relatedTokens: RefreshToken | RefreshToken[] | null =
      await this.iRefreshTokenRepository.findRelatedRefreshTokens(
        owner_id
      );

    if (relatedTokens) {
      await this.iRefreshTokenRepository.deleteRelatedRefreshTokens(
        owner_id
      );
    }

    const refreshToken: RefreshToken | null =
      await this.iRefreshTokenRepository.saveRefreshToken({
        owner_id
      });

    if (!refreshToken) return new GenerateRefreshTokenErrorResponse();

    return refreshToken;
  }
}
