import { InvalidGenerateRefreshTokenErrorResponse } from '../../../handlers/UseCasesResponses/RefreshToken/IGenerateRefreshTokenHandler';
import { RefreshToken } from "@prisma/client";
import { IGenerateRefreshTokenDTO } from "./IGenerateRefreshTokenDTO";
import { IGenerateRefreshTokenRepo } from "@domain/repositories/RefreshToken/IGenerateRefreshTokenRepo";

export class IGenerateRefreshTokenUseCase {
    constructor(private readonly iGenerateRefreshTokenRepo: IGenerateRefreshTokenRepo) {}

    async execute(DTO: IGenerateRefreshTokenDTO): Promise<InvalidGenerateRefreshTokenErrorResponse | RefreshToken> {

        const relatedTokens: RefreshToken | RefreshToken[] | null = await this.iGenerateRefreshTokenRepo.findRelatedRefreshTokens(DTO.user_id);

        if(relatedTokens) {
            await this.iGenerateRefreshTokenRepo.deleteRelatedRefreshTokens(DTO.user_id);
        }
    
        const refreshToken: RefreshToken | null = await this.iGenerateRefreshTokenRepo.saveRefreshToken(DTO);

        if(!refreshToken) return new InvalidGenerateRefreshTokenErrorResponse();

        return refreshToken;
    }
}