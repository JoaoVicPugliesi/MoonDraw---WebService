import { IRefreshSessionTokenRepo } from "@domain/repositories/RefreshToken/IRefreshSessionTokenRepo";
import { prisma } from "@infra/db/Prisma";
import { RefreshToken } from "@prisma/client";

export class IRefreshSessionTokenRepoImpl implements IRefreshSessionTokenRepo {
    async findRefreshToken<T>(param: T): Promise<RefreshToken | null> {
        const refreshToken: RefreshToken | null = await prisma.refreshToken.findFirst({
            where: {
                public_id: param as string
            }
        });

        if(!refreshToken) return null;

        return refreshToken;
    }

    async deleteRelatedRefreshToken<T>(param: T): Promise<void> {
        await prisma.refreshToken.deleteMany({
            where: {
                user_id: param as string
            }
        })
    }
}