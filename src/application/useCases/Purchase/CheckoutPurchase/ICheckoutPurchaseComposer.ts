import { ICheckoutPurchaseFactory } from '@application/factories/Purchase/CheckoutPurchase/ICheckoutPurchaseFactory';
import { ICheckoutPurchaseController } from './ICheckoutPurchaseController';
import { ITokenServiceJWTImpl } from '@infra/services_implementation/ITokenServiceJWTImpl';

const iFactory = new ICheckoutPurchaseFactory();
const iUseCase = iFactory.compose();
const iTokenService = new ITokenServiceJWTImpl();
const iController = new ICheckoutPurchaseController(iUseCase, iTokenService);
const iCheckoutPurchase: ICheckoutPurchaseController = iController;

export { iCheckoutPurchase };