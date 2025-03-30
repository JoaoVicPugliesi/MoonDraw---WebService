import { IGenerateRefreshTokenUseCase } from '@application/useCases/RefreshToken/GenerateRefreshToken/IGenerateRefreshTokenUseCase';
import { IRefreshSessionTokenRepo } from "@domain/repositories/RefreshToken/IRefreshSessionTokenRepo";
import { ITokenService } from "@domain/services/ITokenService";
import { IRefreshSessionTokenDTO } from "./IRefreshSessionTokenDTO";
import { RefreshToken } from "@domain/entities/RefreshToken";
import { InvalidRefreshToken } from "@application/handlers/RefreshToken/IRefreshSessionTokenHandler";
import dayjs from "dayjs";
import { configDotenv } from 'dotenv';
import { IGenerateRefreshTokenDTO } from '../GenerateRefreshToken/IGenerateRefreshTokenDTO';
configDotenv();

export class IRefreshSessionTokenUseCase {

    private readonly secret_key: string;

    constructor(
        private readonly iRefreshSessionTokenRepo: IRefreshSessionTokenRepo,
        private readonly iGenerateRefreshTokenUseCase: IGenerateRefreshTokenUseCase,
        private readonly iTokenService: ITokenService
    ) {
        this.secret_key = process.env.SECRET_KEY as string;
    }

    async execute(DTO: IRefreshSessionTokenDTO): Promise<InvalidRefreshToken | object> {
        const refreshToken: RefreshToken | null = await this.iRefreshSessionTokenRepo.findRefreshToken(DTO.public_id);
        
        if(!refreshToken) return new InvalidRefreshToken();

        const refreshTokenExpired: boolean = dayjs().isAfter(dayjs.unix(refreshToken.expires_in));

        const sessionToken: string = this.iTokenService.sign({
            payload: {
                sub: refreshToken.user_id
            },
            secret_key: this.secret_key,
            options: {
                expiresIn: '30m'
            }
        });

        if(refreshTokenExpired) {
            await this.iRefreshSessionTokenRepo.deleteRelatedRefreshToken(refreshToken.user_id)
            const expiresIn = dayjs().add(7, 'days').unix();
            const DTO: IGenerateRefreshTokenDTO = {
                user_id: refreshToken.user_id,
                expires_in: expiresIn
            };
            const newRefreshToken = await this.iGenerateRefreshTokenUseCase.execute(DTO);

            return { 
                session_token: sessionToken,
                refresh_token: newRefreshToken
            }
        }


        return {
            session_token: sessionToken
        }
    }
}