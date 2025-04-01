import { IRefreshAccessTokenRepo } from "@domain/repositories/RefreshToken/IRefreshAccessTokenRepo";
import { prisma } from "@infra/db/Prisma";
import { RefreshToken } from "@prisma/client";

export class IRefreshAccessTokenRepoImpl implements IRefreshAccessTokenRepo {
    async findRefreshToken<T>(param: T): Promise<RefreshToken | null> {
        const refreshToken: RefreshToken | null = await prisma.refreshToken.findFirst({
            where: {
                public_id: param as string
            }
        });

        if(!refreshToken) return null;

        return refreshToken;
    }
    async deleteRelatedRefreshTokens<T>(param: T): Promise<void> {
        await prisma.refreshToken.deleteMany({
            where: {
                user_id: param as string
            }
        })
    }

}