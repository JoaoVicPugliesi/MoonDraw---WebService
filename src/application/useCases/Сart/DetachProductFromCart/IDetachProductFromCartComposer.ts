import { IDetachProductFromCartFactory } from '@application/factories/Cart/DetachProductFromCart/IDetachProductFromCartFactory';
import { IDetachProductFromCartController } from './IDetachProductFromCartController';
import { IDetachProductFromCartValidator } from '@application/validators/IDetachProductFromCartValidator';
import { ITokenServiceJWTImpl } from '@infra/services_implementation/ITokenServiceJWTImpl';
import { IEnsureMiddlewareImpl } from '@application/middlewares/IEnsureMiddlewareImpl';

const iFactory = new IDetachProductFromCartFactory();
const iUseCase = iFactory.compose();
const iTokenService = new ITokenServiceJWTImpl();
const iValidator = new IDetachProductFromCartValidator();
const iEnsureMiddleware = new IEnsureMiddlewareImpl();
const iController = new IDetachProductFromCartController(
  iUseCase,
  iTokenService,
  iValidator,
  iEnsureMiddleware
);

const iDetachProductFromCart: IDetachProductFromCartController = iController;

export { iDetachProductFromCart };
