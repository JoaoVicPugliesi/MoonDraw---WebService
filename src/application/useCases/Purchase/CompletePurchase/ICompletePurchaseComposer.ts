import { ICompletePurchaseFactory } from './../../../factories/Purchase/CompletePurchase/ICompletePurchaseFactory';
import { ITokenServiceJWTImpl } from '@infra/services_implementation/ITokenServiceJWTImpl';
import { ICompletePurchaseController } from './ICompletePurchaseController';

const iFactory = new ICompletePurchaseFactory();
const iUseCase = iFactory.compose();
const iTokenService = new ITokenServiceJWTImpl();
const iController = new ICompletePurchaseController(iUseCase, iTokenService);
const iCompletePurchase: ICompletePurchaseController = iController;

export { iCompletePurchase };
