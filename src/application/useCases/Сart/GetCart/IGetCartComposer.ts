import { IGetCartFactory } from '@application/factories/Cart/GetCart/IGetCartFactory';
import { ITokenServiceJWTImpl } from '@infra/services/ITokenServiceJWTImpl';
import { IEnsureMiddlewareImpl } from '@application/middlewares/IEnsureMiddlewareImpl';
import { IGetCartController } from './IGetCartController';

const iFactory = new IGetCartFactory();
const iUseCase = iFactory.compose();
const iTokenService = new ITokenServiceJWTImpl();
const iEnsureMiddlware = new IEnsureMiddlewareImpl();
const iController = new IGetCartController(
  iUseCase,
  iTokenService,
  iEnsureMiddlware
);

const iGetCart: IGetCartController = iController;

export { iGetCart };