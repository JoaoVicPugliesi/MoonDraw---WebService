
import { prisma } from "@infra/db/Prisma";
import { RefreshToken } from "@domain/entities/RefreshToken";
import { IGenerateRefreshTokenRepo } from "@domain/repositories/RefreshToken/IGenerateRefreshTokenRepo";
import { randomUUID } from "crypto";
import dayjs from "dayjs";

export class IGenerateRefreshTokenRepoImpl implements IGenerateRefreshTokenRepo {
    async saveRefreshToken<T>(param: T): Promise<RefreshToken | null> {

        const expiresIn = dayjs().add(20, 'second').unix();

        const refreshToken: RefreshToken | null = await prisma.refreshToken.create({
            data: {
                public_id: randomUUID(),
                user_id: param as string,
                expires_in: expiresIn
            }
        });

        if(!refreshToken) return null;

        return refreshToken;
    }
}