import { IGetCartFactory } from '@application/factories/Cart/GetCart/IGetCartFactory';
import { ITokenServiceJWTImpl } from '@infra/services/ITokenServiceJWTImpl';
import { IEnsureAuthMiddlewareImpl } from '@application/middlewares/Auth/IEnsureAuthMiddlewareImpl';
import { IGetCartController } from './IGetCartController';

const iFactory = new IGetCartFactory();
const iUseCase = iFactory.compose();
const iTokenService = new ITokenServiceJWTImpl();
const iEnsureAuthMiddleware = new IEnsureAuthMiddlewareImpl();
const iController = new IGetCartController(
  iUseCase,
  iTokenService,
  iEnsureAuthMiddleware
);

const iGetCart: IGetCartController = iController;

export { iGetCart };