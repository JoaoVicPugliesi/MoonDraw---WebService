import { IDetachProductFromCartFactory } from '@application/factories/Cart/DetachProductFromCart/IDetachProductFromCartFactory';
import { IDetachProductFromCartController } from './IDetachProductFromCartController';
import { ITokenServiceJWTImpl } from '@infra/services/ITokenServiceJWTImpl';
import { IEnsureMiddlewareImpl } from '@application/middlewares/IEnsureMiddlewareImpl';
import { ICartValidatorZodImpl } from '@application/validators/Request/Cart/ICartValidatorZodImpl';

const iFactory = new IDetachProductFromCartFactory();
const iUseCase = iFactory.compose();
const iTokenService = new ITokenServiceJWTImpl();
const iValidator = new ICartValidatorZodImpl();
const iEnsureMiddleware = new IEnsureMiddlewareImpl();
const iController = new IDetachProductFromCartController(
  iUseCase,
  iTokenService,
  iValidator,
  iEnsureMiddleware
);

const iDetachProductFromCart: IDetachProductFromCartController = iController;

export { iDetachProductFromCart };
