import { IGenerateRefreshTokenDTO } from '@application/useCases/RefreshToken/GenerateRefreshToken/IGenerateRefreshTokenDTO';
import { RefreshToken } from '@domain/entities/RefreshToken';
import { IGenerateRefreshTokenRepo } from '@domain/repositories/RefreshToken/IGenerateRefreshTokenRepo';
import { IGenerateRefreshTokenRepoPrismaImpl } from '@infra/repositories_implementation/RefreshToken/GenerateRefreshToken/IGenerateRefreshTokenRepoPrismaImpl';

export class IGenerateRefreshTokenDecorator implements IGenerateRefreshTokenRepo {
    constructor(
        private readonly decoratee: IGenerateRefreshTokenRepo
    ) {}

    async findRelatedRefreshTokens<T>(param: T): Promise<RefreshToken | RefreshToken[] | null> {
        return await this.decoratee.findRelatedRefreshTokens(param);
    }

    async deleteRelatedRefreshTokens<T>(param: T): Promise<void> {
        return await this.decoratee.deleteRelatedRefreshTokens(param);
    }

    async saveRefreshToken(DTO: IGenerateRefreshTokenDTO): Promise<RefreshToken | null> {
        return await this.decoratee.saveRefreshToken(DTO);
    }
}

const iGenerateRefreshTokenRepoPrisma = new IGenerateRefreshTokenRepoPrismaImpl();
const iGenerateRefreshTokenDecorator = new IGenerateRefreshTokenDecorator(iGenerateRefreshTokenRepoPrisma);

export { iGenerateRefreshTokenDecorator };