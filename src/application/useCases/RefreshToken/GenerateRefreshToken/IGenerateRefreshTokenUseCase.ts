import { InvalidGenerateRefreshToken } from './../../../handlers/RefreshToken/IGenerateRefreshTokenHandler';
import { RefreshToken } from "@prisma/client";
import { IGenerateRefreshTokenDTO } from "./IGenerateRefreshTokenDTO";
import { IGenerateRefreshTokenRepo } from "@domain/repositories/RefreshToken/IGenerateRefreshTokenRepo";

export class IGenerateRefreshToken {
    constructor(private readonly iGenerateRefreshTokenRepo: IGenerateRefreshTokenRepo) {}

    async execute(DTO: IGenerateRefreshTokenDTO): Promise<InvalidGenerateRefreshToken | RefreshToken> {
        const refreshToken: RefreshToken | null = await this.iGenerateRefreshTokenRepo.saveRefreshToken(DTO.public_id);

        if(!refreshToken) return new InvalidGenerateRefreshToken();

        return refreshToken;
    }
}