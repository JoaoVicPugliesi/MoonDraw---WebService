import { InvalidGenerateRefreshToken } from './../../../handlers/RefreshToken/IGenerateRefreshTokenHandler';
import { RefreshToken } from "@prisma/client";
import { IGenerateRefreshTokenDTO } from "./IGenerateRefreshTokenDTO";
import { IGenerateRefreshTokenRepo } from "@domain/repositories/RefreshToken/IGenerateRefreshTokenRepo";
import dayjs from "dayjs";

export class IGenerateRefreshTokenUseCase {
    constructor(private readonly iGenerateRefreshTokenRepo: IGenerateRefreshTokenRepo) {}

    async execute(DTO: IGenerateRefreshTokenDTO): Promise<InvalidGenerateRefreshToken | RefreshToken> {

        const relatedTokens: RefreshToken | RefreshToken[] | null = await this.iGenerateRefreshTokenRepo.findRelatedRefreshTokens(DTO.user_id);

        if(relatedTokens) {
            await this.iGenerateRefreshTokenRepo.deleteRelatedRefreshTokens(DTO.user_id);
        }
        
        const expiresIn = dayjs().add(20, 'seconds').unix();
        DTO.expires_in = expiresIn;
        const refreshToken: RefreshToken | null = await this.iGenerateRefreshTokenRepo.saveRefreshToken(DTO);

        if(!refreshToken) return new InvalidGenerateRefreshToken();

        return refreshToken;
    }
}