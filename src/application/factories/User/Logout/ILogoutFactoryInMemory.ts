import { RefreshToken } from "@domain/entities/RefreshToken";
import { ILogoutUseCase } from "@application/useCases/User/Logout/ILogoutUseCase";
import { IRefreshTokenRepositoryInMemoryImpl } from "@infra/repositories/RefreshToken/IRefreshTokenRepositoryInMemoryImpl";

export class ILogOutFactoryInMemory {
  constructor(
    private readonly refreshTokens: RefreshToken[]
  ) {}
  compose(): ILogoutUseCase {
    const iRepository = new IRefreshTokenRepositoryInMemoryImpl(this.refreshTokens);
    return new ILogoutUseCase(iRepository);
  }
}
