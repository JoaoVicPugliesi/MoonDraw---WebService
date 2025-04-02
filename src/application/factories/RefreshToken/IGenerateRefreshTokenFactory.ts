import { IGenerateRefreshTokenRepoImpl } from '@infra/repositories_implementation/RefreshToken/GenerateRefreshToken/IGenerateRefreshTokenRepoImpl';
import { IGenerateRefreshTokenUseCase } from '@application/useCases/RefreshToken/GenerateRefreshToken/IGenerateRefreshTokenUseCase';

export class IGenerateRefreshTokenFactory {
  compose(): IGenerateRefreshTokenUseCase {
    const iGenerateRefreshTokenRepo = new IGenerateRefreshTokenRepoImpl();
    const iGenerateRefreshTokenUseCase = new IGenerateRefreshTokenUseCase(
      iGenerateRefreshTokenRepo
    );

    return iGenerateRefreshTokenUseCase;
  }
}
