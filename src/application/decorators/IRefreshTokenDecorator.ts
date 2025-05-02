import { IGenerateRefreshTokenDTO } from '@application/useCases/RefreshToken/GenerateRefreshToken/IGenerateRefreshTokenDTO';
import { RefreshToken } from '@domain/entities/RefreshToken';
import { IRefreshTokenRepository } from '@domain/repositories/IRefreshTokenRepository';
import { IRefreshTokenRepositoryPrismaImpl } from '@infra/repositories/RefreshToken/IRefreshTokenRepositoryPrismaImpl';

class IRefreshTokenDecorator implements IRefreshTokenRepository {
  constructor(
    private readonly decoratee: IRefreshTokenRepository
) {}

  async findRelatedRefreshTokens<T>(
    param: T
  ): Promise<RefreshToken | RefreshToken[] | null> {
    return await this.decoratee.findRelatedRefreshTokens(param);
  }

  async findRefreshToken<T>(param: T): Promise<RefreshToken | null> {
    return await this.decoratee.findRefreshToken(param);
  }

  async deleteRelatedRefreshTokens<T>(param: T): Promise<void> {
    return await this.decoratee.deleteRelatedRefreshTokens(param);
  }

  async saveRefreshToken({
    owner_id,
  }: IGenerateRefreshTokenDTO): Promise<RefreshToken | null> {
    return await this.decoratee.saveRefreshToken({
      owner_id,
    });
  }
}

const decoratee = new IRefreshTokenRepositoryPrismaImpl;
const iRefreshTokenDecorator = new IRefreshTokenDecorator(decoratee);

export { iRefreshTokenDecorator };