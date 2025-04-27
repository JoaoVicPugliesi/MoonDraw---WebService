import { IRefreshAccessTokenFactory } from '@application/factories/RefreshToken/RefreshAccessToken/IRefreshAccessTokenFactory';
import { IRefreshAccessTokenController } from './IRefreshAccessTokenController';
import { IEnsureMiddlewareImpl } from '@application/middlewares/IEnsureMiddlewareImpl';

const iFactory = new IRefreshAccessTokenFactory();
const iUseCase = iFactory.compose();
const iEnsureMiddleware = new IEnsureMiddlewareImpl();
const iController = new IRefreshAccessTokenController(iUseCase, iEnsureMiddleware);
const iRefreshAccessToken: IRefreshAccessTokenController = iController;

export { iRefreshAccessToken };
