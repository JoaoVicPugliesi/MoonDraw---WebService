import { IAttachProductIntoCartFactory } from '@application/factories/Cart/AttachProductIntoCart/IAttachProductIntoCartFactory';
import { IAttachProductIntoCartController } from './IAttachProductIntoCartController';
import { ITokenServiceJWTImpl } from '@infra/services_implementation/ITokenServiceJWTImpl';
import { IEnsureMiddlewareImpl } from '@application/middlewares/IEnsureMiddlewareImpl';
import { ICartValidatorZodImpl } from '@application/validators/Cart/ICartValidatorZodImpl';

const iFactory = new IAttachProductIntoCartFactory();
const iUseCase = iFactory.compose();
const iTokenService = new ITokenServiceJWTImpl();
const iValidator = new ICartValidatorZodImpl();
const iEnsureMiddleware = new IEnsureMiddlewareImpl();
const iController = new IAttachProductIntoCartController(
  iUseCase,
  iTokenService,
  iValidator,
  iEnsureMiddleware
);
const iAttachProductIntoCart: IAttachProductIntoCartController = iController;

export { iAttachProductIntoCart };
