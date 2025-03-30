import { IGenerateRefreshTokenDTO } from './../../../application/useCases/RefreshToken/GenerateRefreshToken/IGenerateRefreshTokenDTO';
import { prisma } from "@infra/db/Prisma";
import { RefreshToken } from "@domain/entities/RefreshToken";
import { IGenerateRefreshTokenRepo } from "@domain/repositories/RefreshToken/IGenerateRefreshTokenRepo";
import { randomUUID } from "crypto";


export class IGenerateRefreshTokenRepoImpl implements IGenerateRefreshTokenRepo {
    async saveRefreshToken(DTO: IGenerateRefreshTokenDTO): Promise<RefreshToken | null> {

        const refreshToken: RefreshToken | null = await prisma.refreshToken.create({
            data: {
                public_id: randomUUID(),
                user_id: DTO.user_id,
                expires_in: DTO.expires_in
            }
        });

        if(!refreshToken) return null;

        return refreshToken;
    }
}