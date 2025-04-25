import { IInitiatePurchaseFactory } from '@application/factories/Purchase/InitiatePurchase/IInitiatePurchaseFactory';
import { ITokenServiceJWTImpl } from '@infra/services_implementation/ITokenServiceJWTImpl';
import { IInitiatePurchaseValidator } from '@application/validators/IInitiatePurchaseValidator';
import { IInitiatePurchaseController } from './IInitiatePurchaseController';
import { IEnsureMiddlewareImpl } from '@application/middlewares/IEnsureMiddlewareImpl';

const iFactory = new IInitiatePurchaseFactory();
const iUseCase = iFactory.compose();
const iTokenService = new ITokenServiceJWTImpl();
const iValidator = new IInitiatePurchaseValidator();
const iEnsureMiddleware = new IEnsureMiddlewareImpl();
const iController = new IInitiatePurchaseController(
  iUseCase,
  iTokenService,
  iValidator,
  iEnsureMiddleware
);
const iInitiatePurchase: IInitiatePurchaseController = iController;

export { iInitiatePurchase };
