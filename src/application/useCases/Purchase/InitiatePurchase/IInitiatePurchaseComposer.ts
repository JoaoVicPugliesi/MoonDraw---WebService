import { IInitiatePurchaseFactory } from '@application/factories/Purchase/InitiatePurchase/IInitiatePurchaseFactory';
import { ITokenServiceJWTImpl } from '@infra/services/ITokenServiceJWTImpl';
import { IInitiatePurchaseController } from './IInitiatePurchaseController';
import { IEnsureAuthMiddlewareImpl } from '@application/middlewares/Auth/IEnsureAuthMiddlewareImpl';
import { IPurchaseValidatorZodImpl } from '@application/validators/Request/Purchase/IPurchaseValidatorZodImpl';

const iFactory = new IInitiatePurchaseFactory();
const iUseCase = iFactory.compose();
const iTokenService = new ITokenServiceJWTImpl();
const iValidator = new IPurchaseValidatorZodImpl();
const iEnsureAuthMiddleware = new IEnsureAuthMiddlewareImpl();
const iController = new IInitiatePurchaseController(
  iUseCase,
  iTokenService,
  iValidator,
  iEnsureAuthMiddleware
);
const iInitiatePurchase: IInitiatePurchaseController = iController;

export { iInitiatePurchase };
