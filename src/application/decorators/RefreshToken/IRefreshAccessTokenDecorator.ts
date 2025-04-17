import { User } from '@domain/entities/User';
import { RefreshToken } from '@domain/entities/RefreshToken';
import { IRefreshAccessTokenRepo } from '@domain/repositories/RefreshToken/IRefreshAccessTokenRepo';
import { IRefreshAccessTokenRepoPrismaImpl } from '@infra/repositories_implementation/RefreshToken/RefreshAccessToken/IRefreshAccessTokenRepoPrismaImpl';

export class IRefreshAccessTokenDecorator implements IRefreshAccessTokenRepo {
    constructor(
        private readonly decoratee: IRefreshAccessTokenRepo
    ) {}

    async findRefreshToken<T>(param: T): Promise<RefreshToken | null> {
        return await this.decoratee.findRefreshToken(param)
    }

    async findRefreshTokenUser<T>(param: T): Promise<User | null> {
        return await this.decoratee.findRefreshTokenUser(param)
    }

    async deleteRelatedRefreshTokens<T>(param: T): Promise<void> {
        return await this.decoratee.deleteRelatedRefreshTokens(param)
    }
 
}

const decoratee = new IRefreshAccessTokenRepoPrismaImpl();
const iRefreshAccessTokenDecorator = new IRefreshAccessTokenDecorator(decoratee);

export { iRefreshAccessTokenDecorator };