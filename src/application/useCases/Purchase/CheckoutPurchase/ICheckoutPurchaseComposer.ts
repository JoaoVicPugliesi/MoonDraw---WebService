import { ICheckoutPurchaseFactory } from '@application/factories/Purchase/CheckoutPurchase/ICheckoutPurchaseFactory';
import { ICheckoutPurchaseController } from './ICheckoutPurchaseController';
import { ITokenServiceJWTImpl } from '@infra/services/ITokenServiceJWTImpl';
import { IEnsureAuthMiddlewareImpl } from '@application/middlewares/Auth/IEnsureAuthMiddlewareImpl';

const iFactory = new ICheckoutPurchaseFactory();
const iUseCase = iFactory.compose();
const iTokenService = new ITokenServiceJWTImpl();
const iEnsureAuthMiddleware = new IEnsureAuthMiddlewareImpl();
const iController = new ICheckoutPurchaseController(
  iUseCase,
  iTokenService,
  iEnsureAuthMiddleware
);
const iCheckoutPurchase: ICheckoutPurchaseController = iController;

export { iCheckoutPurchase };
