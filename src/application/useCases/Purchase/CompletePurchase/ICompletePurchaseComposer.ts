import { ICompletePurchaseFactory } from '@application/factories/Purchase/CompletePurchase/ICompletePurchaseFactory';
import { ITokenServiceJWTImpl } from '@infra/services/ITokenServiceJWTImpl';
import { ICompletePurchaseController } from './ICompletePurchaseController';
import { IEnsureAuthMiddlewareImpl } from '@application/middlewares/Auth/IEnsureAuthMiddlewareImpl';
import { IPurchaseValidatorZodImpl } from '@application/validators/Request/Purchase/IPurchaseValidatorZodImpl';

const iFactory = new ICompletePurchaseFactory();
const iUseCase = iFactory.compose();
const iTokenService = new ITokenServiceJWTImpl();
const iEnsureAuthMiddleware = new IEnsureAuthMiddlewareImpl();
const iValidator = new IPurchaseValidatorZodImpl();
const iController = new ICompletePurchaseController(
  iUseCase,
  iTokenService,
  iValidator,
  iEnsureAuthMiddleware
);
const iCompletePurchase: ICompletePurchaseController = iController;

export { iCompletePurchase };
