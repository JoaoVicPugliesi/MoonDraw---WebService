import { IRefreshAccessTokenRepoImpl } from '@infra/repositories_implementation/RefreshToken/RefreshAccessToken/IRefreshAccessTokenRepoImpl';
import { IGenerateRefreshTokenRepoImpl } from '@infra/repositories_implementation/RefreshToken/GenerateRefreshToken/IGenerateRefreshTokenRepoImpl';
import { IGenerateRefreshTokenUseCase } from '@application/useCases/RefreshToken/GenerateRefreshToken/IGenerateRefreshTokenUseCase';
import { IJWTTokenServiceImpl } from '@infra/services_implementation/IJWTTokenServiceImpl';
import { IRefreshAccessTokenUseCase } from './IRefreshAccessTokenUseCase';
import { IRefreshAccessTokenController } from './IRefreshAccessTokenController';

const iRefreshAccessTokenRepo = new IRefreshAccessTokenRepoImpl();
const iTokenService = new IJWTTokenServiceImpl();
const iGenerateRefreshTokenRepo = new IGenerateRefreshTokenRepoImpl();
const iGenerateRefreshTokenUseCase = new IGenerateRefreshTokenUseCase(iGenerateRefreshTokenRepo);
const iRefreshAccessTokenUseCase = new IRefreshAccessTokenUseCase(
  iRefreshAccessTokenRepo,
  iGenerateRefreshTokenUseCase,
  iTokenService
);

const iRefreshAccessTokenController = new IRefreshAccessTokenController(iRefreshAccessTokenUseCase);

export const refreshToken: IRefreshAccessTokenController = iRefreshAccessTokenController;