import { IRefreshAccessTokenFactory } from '@application/factories/RefreshToken/RefreshAccessToken/IRefreshAccessTokenFactory';
import { IRefreshAccessTokenController } from './IRefreshAccessTokenController';
import { IEnsureAuthMiddlewareImpl } from '@application/middlewares/Auth/IEnsureAuthMiddlewareImpl';

const iFactory = new IRefreshAccessTokenFactory();
const iUseCase = iFactory.compose();
const iEnsureAuthMiddleware = new IEnsureAuthMiddlewareImpl();
const iController = new IRefreshAccessTokenController(iUseCase, iEnsureAuthMiddleware);
const iRefreshAccessToken: IRefreshAccessTokenController = iController;

export { iRefreshAccessToken };
