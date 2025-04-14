import { IRefreshAccessTokenFactory } from '@application/factories/RefreshToken/RefreshAccessToken/IRefreshAccessTokenFactory';
import { IRefreshAccessTokenController } from './IRefreshAccessTokenController';

const iRefreshAccessTokenFactory = new IRefreshAccessTokenFactory();
const iRefreshAccessTokenUseCase = iRefreshAccessTokenFactory.compose();
const iRefreshAccessTokenController = new IRefreshAccessTokenController(
  iRefreshAccessTokenUseCase
);

export const refreshToken: IRefreshAccessTokenController =
  iRefreshAccessTokenController;
