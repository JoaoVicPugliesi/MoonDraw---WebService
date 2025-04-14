import { ILogoutRepo } from "@domain/repositories/User/ILogoutRepo";
import { ILogoutDTO } from "./ILogoutDTO";
import { RefreshToken } from "@domain/entities/RefreshToken";
import { InvalidRefreshTokenNotFoundErrorResponse } from "@application/handlers/UseCasesResponses/User/ILogoutHandlers";

export class ILogoutUseCase {
    constructor(
        private readonly iLogoutRepo: ILogoutRepo
    ) {}

    async execute(DTO: ILogoutDTO): Promise<InvalidRefreshTokenNotFoundErrorResponse | void> {
        const refreshToken: RefreshToken | null = await this.iLogoutRepo.findRefreshToken(DTO.public_id);

        if(!refreshToken) return new InvalidRefreshTokenNotFoundErrorResponse;

        await this.iLogoutRepo.deleteRelatedRefreshTokens(refreshToken.user_id);
    }
}