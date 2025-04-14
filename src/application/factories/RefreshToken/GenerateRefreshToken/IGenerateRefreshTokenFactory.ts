import { iGenerateRefreshTokenDecorator } from '@application/decorators/RefreshToken/IGenerateRefreshTokenDecorator';
import { IGenerateRefreshTokenUseCase } from '@application/useCases/RefreshToken/GenerateRefreshToken/IGenerateRefreshTokenUseCase';

export class IGenerateRefreshTokenFactory {
  compose(): IGenerateRefreshTokenUseCase {
    const iGenerateRefreshTokenUseCase = new IGenerateRefreshTokenUseCase(
      iGenerateRefreshTokenDecorator
    );

    return iGenerateRefreshTokenUseCase;
  }
}
