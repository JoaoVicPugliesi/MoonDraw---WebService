import { IRefreshSessionTokenRepoImpl } from '@infra/repositories_implementation/RefreshToken/IRefreshSessionTokenRepoImpl';
import { IGenerateRefreshTokenRepoImpl } from '@infra/repositories_implementation/RefreshToken/IGenerateRefreshTokenRepoImpl';
import { IGenerateRefreshTokenUseCase } from '@application/useCases/RefreshToken/GenerateRefreshToken/IGenerateRefreshTokenUseCase';
import { ITokenServiceImpl } from '@infra/services_implementation/ITokenServiceImpl';
import { IRefreshSessionTokenUseCase } from './IRefreshSessionTokenUseCase';
import { IRefreshSessionTokenController } from './IRefreshSessionTokenController';

const iRefreshSessionTokenRepo = new IRefreshSessionTokenRepoImpl();
const iTokenService = new ITokenServiceImpl();
const iGenerateRefreshTokenRepo = new IGenerateRefreshTokenRepoImpl();
const iGenerateRefreshTokenUseCase = new IGenerateRefreshTokenUseCase(iGenerateRefreshTokenRepo);
const iRefreshSessionTokenUseCase = new IRefreshSessionTokenUseCase(
  iRefreshSessionTokenRepo,
  iGenerateRefreshTokenUseCase,
  iTokenService
);

const iRefreshSessionTokenController = new IRefreshSessionTokenController(iRefreshSessionTokenUseCase);

export const refreshToken: IRefreshSessionTokenController = iRefreshSessionTokenController;