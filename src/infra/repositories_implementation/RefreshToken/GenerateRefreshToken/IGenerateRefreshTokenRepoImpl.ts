import dayjs from "dayjs";
import { prisma } from "@infra/db/Prisma";
import { IGenerateRefreshTokenDTO } from '@application/useCases/RefreshToken/GenerateRefreshToken/IGenerateRefreshTokenDTO';
import { RefreshToken } from "@domain/entities/RefreshToken";
import { IGenerateRefreshTokenRepo } from "@domain/repositories/RefreshToken/IGenerateRefreshTokenRepo";
import { randomUUID } from "crypto";


export class IGenerateRefreshTokenRepoImpl implements IGenerateRefreshTokenRepo {

    async findRelatedRefreshTokens<T>(param: T): Promise<RefreshToken | RefreshToken[] | null> {
        const refreshTokens: RefreshToken | RefreshToken[] | null = await prisma.refreshToken.findMany({
            where: {
                user_id: param as string
            }
        })

        if(!refreshTokens) return null;

        return refreshTokens;
    }

    async deleteRelatedRefreshTokens<T>(param: T): Promise<void> {
        await prisma.refreshToken.deleteMany({
            where: {
                user_id: param as string
            }
        })
    }
    async saveRefreshToken(DTO: IGenerateRefreshTokenDTO): Promise<RefreshToken | null> {

        const expiresIn = dayjs().add(14, 'days').unix();
        const refreshToken: RefreshToken | null = await prisma.refreshToken.create({
            data: {
                public_id: randomUUID(),
                user_id: DTO.user_id,
                expires_in: expiresIn
            }
        });

        if(!refreshToken) return null;

        return refreshToken;
    }

}