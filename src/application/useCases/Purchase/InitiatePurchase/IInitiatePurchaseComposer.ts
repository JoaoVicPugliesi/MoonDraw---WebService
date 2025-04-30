import { IInitiatePurchaseFactory } from '@application/factories/Purchase/InitiatePurchase/IInitiatePurchaseFactory';
import { ITokenServiceJWTImpl } from '@infra/services/ITokenServiceJWTImpl';
import { IInitiatePurchaseController } from './IInitiatePurchaseController';
import { IEnsureMiddlewareImpl } from '@application/middlewares/IEnsureMiddlewareImpl';
import { IPurchaseValidatorZodImpl } from '@application/validators/Request/Purchase/IPurchaseValidatorZodImpl';

const iFactory = new IInitiatePurchaseFactory();
const iUseCase = iFactory.compose();
const iTokenService = new ITokenServiceJWTImpl();
const iValidator = new IPurchaseValidatorZodImpl();
const iEnsureMiddleware = new IEnsureMiddlewareImpl();
const iController = new IInitiatePurchaseController(
  iUseCase,
  iTokenService,
  iValidator,
  iEnsureMiddleware
);
const iInitiatePurchase: IInitiatePurchaseController = iController;

export { iInitiatePurchase };
