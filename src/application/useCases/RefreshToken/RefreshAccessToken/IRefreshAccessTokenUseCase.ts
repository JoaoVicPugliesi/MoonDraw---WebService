import dayjs from "dayjs";
import { IGenerateRefreshTokenUseCase } from '@application/useCases/RefreshToken/GenerateRefreshToken/IGenerateRefreshTokenUseCase';
import { IRefreshAccessTokenRepo } from "@domain/repositories/RefreshToken/IRefreshAccessTokenRepo";
import { ITokenService } from "@domain/services/ITokenService";
import { IRefreshAccessTokenDTO } from "./IRefreshAccessTokenDTO";
import { RefreshToken } from "@domain/entities/RefreshToken";
import { InvalidRefreshToken } from '@application/handlers/RefreshToken/IRefreshAccessTokenHandler';
import { IGenerateRefreshTokenDTO } from '../GenerateRefreshToken/IGenerateRefreshTokenDTO';
import { configDotenv } from 'dotenv';
configDotenv();

export class IRefreshAccessTokenUseCase {

    private readonly secret_key: string;

    constructor(
        private readonly iRefreshAccessTokenRepo: IRefreshAccessTokenRepo,
        private readonly iGenerateRefreshTokenUseCase: IGenerateRefreshTokenUseCase,
        private readonly iTokenService: ITokenService
    ) {
        this.secret_key = process.env.SECRET_KEY as string;
    }

    async execute(DTO: IRefreshAccessTokenDTO): Promise<InvalidRefreshToken | object> {
        const refreshToken: RefreshToken | null = await this.iRefreshAccessTokenRepo.findRefreshToken(DTO.public_id);
        
        if(!refreshToken) return new InvalidRefreshToken();
        
        const refreshTokenExpired: boolean = dayjs().isAfter(dayjs.unix(refreshToken.expires_in));

        const AccessToken: string = this.iTokenService.sign({
            payload: {
                sub: refreshToken.user_id
            },
            secret_key: this.secret_key,
            options: {
                expiresIn: '30m'
            }
        });

        if(refreshTokenExpired) {
            await this.iRefreshAccessTokenRepo.deleteRelatedRefreshTokens(refreshToken.user_id)
            const DTO: IGenerateRefreshTokenDTO = {
                user_id: refreshToken.user_id,
            };
            const newRefreshToken = await this.iGenerateRefreshTokenUseCase.execute(DTO);

            return { 
                Access_token: AccessToken,
                refresh_token: newRefreshToken
            }
        }


        return {
            Access_token: AccessToken
        }
    }
}