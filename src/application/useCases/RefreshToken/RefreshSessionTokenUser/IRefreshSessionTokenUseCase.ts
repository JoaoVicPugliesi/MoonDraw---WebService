import { IRefreshSessionTokenRepo } from "@domain/repositories/RefreshToken/IRefreshSessionTokenRepo";
import { ITokenService } from "@domain/services/ITokenService";
import { IRefreshSessionTokenDTO } from "./IRefreshSessionTokenDTO";
import { RefreshToken } from "@domain/entities/RefreshToken";
import { InvalidRefreshToken } from "@application/handlers/RefreshToken/IRefreshSessionTokenHandler";
import { configDotenv } from 'dotenv';
configDotenv();

export class IRefreshSessionTokenUseCase {

    private readonly secret_key: string;

    constructor(
        private readonly iRefreshSessionTokenRepo: IRefreshSessionTokenRepo,
        private readonly iTokenService: ITokenService
    ) {
        this.secret_key = process.env.SECRET_KEY as string;
    }

    async execute(DTO: IRefreshSessionTokenDTO): Promise<InvalidRefreshToken | object> {
        const refreshToken: RefreshToken | null = await this.iRefreshSessionTokenRepo.findRefreshToken(DTO.public_id);
        
        if(!refreshToken) return new InvalidRefreshToken();

        const sessionToken: string = this.iTokenService.sign({
            payload: {
                sub: refreshToken.user_id
            },
            secret_key: this.secret_key,
            options: {
                expiresIn: '20s'
            }
        })

        return {
            session_token: sessionToken
        }
    }
}