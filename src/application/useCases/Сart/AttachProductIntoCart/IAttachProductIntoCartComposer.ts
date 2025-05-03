import { IAttachProductIntoCartFactory } from '@application/factories/Cart/AttachProductIntoCart/IAttachProductIntoCartFactory';
import { IAttachProductIntoCartController } from './IAttachProductIntoCartController';
import { ITokenServiceJWTImpl } from '@infra/services/ITokenServiceJWTImpl';
import { IEnsureAuthMiddlewareImpl } from '@application/middlewares/Auth/IEnsureAuthMiddlewareImpl';
import { ICartValidatorZodImpl } from '@application/validators/Request/Cart/ICartValidatorZodImpl';

const iFactory = new IAttachProductIntoCartFactory();
const iUseCase = iFactory.compose();
const iTokenService = new ITokenServiceJWTImpl();
const iValidator = new ICartValidatorZodImpl();
const iEnsureAuthMiddleware = new IEnsureAuthMiddlewareImpl();
const iController = new IAttachProductIntoCartController(
  iUseCase,
  iTokenService,
  iValidator,
  iEnsureAuthMiddleware
);
const iAttachProductIntoCart: IAttachProductIntoCartController = iController;

export { iAttachProductIntoCart };
