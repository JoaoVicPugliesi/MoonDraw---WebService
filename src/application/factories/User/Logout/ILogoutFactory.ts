import { iRefreshTokenDecorator } from "@application/decorators/IRefreshTokenDecorator";
import { ILogoutUseCase } from "@application/useCases/User/Logout/ILogoutUseCase";

export class ILogoutFactory {
    compose(): ILogoutUseCase {
        return new ILogoutUseCase(iRefreshTokenDecorator);
    }
}