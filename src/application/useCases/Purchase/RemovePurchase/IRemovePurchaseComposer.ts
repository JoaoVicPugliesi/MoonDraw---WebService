import { IRemovePurchaseFactory } from '@application/factories/Purchase/RemovePurchase/IRemovePurchaseFactory';
import { ITokenServiceJWTImpl } from '@infra/services_implementation/ITokenServiceJWTImpl';
import { IRemovePurchaseController } from './IRemovePurchaseController';

const iFactory = new IRemovePurchaseFactory();
const iUseCase = iFactory.compose();
const iTokenService = new ITokenServiceJWTImpl();
const iController = new IRemovePurchaseController(
    iUseCase,
    iTokenService
);
const iRemovePurchase: IRemovePurchaseController = iController;

export { iRemovePurchase };