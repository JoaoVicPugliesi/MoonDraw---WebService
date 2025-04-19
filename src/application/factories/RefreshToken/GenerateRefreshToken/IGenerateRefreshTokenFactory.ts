import { iRefreshTokenDecorator } from '@application/decorators/IRefreshTokenDecorator';
import { IGenerateRefreshTokenUseCase } from '@application/useCases/RefreshToken/GenerateRefreshToken/IGenerateRefreshTokenUseCase';

export class IGenerateRefreshTokenFactory {
  compose(): IGenerateRefreshTokenUseCase {
    return new IGenerateRefreshTokenUseCase(iRefreshTokenDecorator);
  }
}
