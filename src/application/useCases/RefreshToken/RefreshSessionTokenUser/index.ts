import { IRefreshSessionTokenRepoImpl } from '@infra/repositories_implementation/RefreshToken/IRefreshSessionTokenRepoImpl';
import { ITokenServiceImpl } from '@infra/services_implementation/ITokenServiceImpl';
import { IRefreshSessionTokenUseCase } from './IRefreshSessionTokenUseCase';
import { IRefreshSessionTokenController } from './IRefreshSessionTokenController';

const iRefreshSessionTokenRepo = new IRefreshSessionTokenRepoImpl();
const iTokenService = new ITokenServiceImpl();
const iRefreshSessionTokenUseCase = new IRefreshSessionTokenUseCase(
  iRefreshSessionTokenRepo,
  iTokenService
);

const iRefreshSessionTokenController = new IRefreshSessionTokenController(iRefreshSessionTokenUseCase);

export const refreshToken: IRefreshSessionTokenController = iRefreshSessionTokenController;