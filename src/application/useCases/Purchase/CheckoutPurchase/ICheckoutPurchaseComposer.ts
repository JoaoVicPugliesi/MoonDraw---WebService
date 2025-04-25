import { ICheckoutPurchaseFactory } from '@application/factories/Purchase/CheckoutPurchase/ICheckoutPurchaseFactory';
import { ICheckoutPurchaseController } from './ICheckoutPurchaseController';
import { ITokenServiceJWTImpl } from '@infra/services_implementation/ITokenServiceJWTImpl';
import { IEnsureMiddlewareImpl } from '@application/middlewares/IEnsureMiddlewareImpl';

const iFactory = new ICheckoutPurchaseFactory();
const iUseCase = iFactory.compose();
const iTokenService = new ITokenServiceJWTImpl();
const iEnsureMiddleware = new IEnsureMiddlewareImpl();
const iController = new ICheckoutPurchaseController(iUseCase, iTokenService, iEnsureMiddleware);
const iCheckoutPurchase: ICheckoutPurchaseController = iController;

export { iCheckoutPurchase };