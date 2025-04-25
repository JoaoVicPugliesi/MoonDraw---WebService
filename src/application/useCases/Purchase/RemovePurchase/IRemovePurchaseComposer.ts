import { IRemovePurchaseFactory } from '@application/factories/Purchase/RemovePurchase/IRemovePurchaseFactory';
import { ITokenServiceJWTImpl } from '@infra/services_implementation/ITokenServiceJWTImpl';
import { IRemovePurchaseController } from './IRemovePurchaseController';
import { IEnsureMiddlewareImpl } from '@application/middlewares/IEnsureMiddlewareImpl';

const iFactory = new IRemovePurchaseFactory();
const iUseCase = iFactory.compose();
const iTokenService = new ITokenServiceJWTImpl();
const iEnsureMiddleware = new IEnsureMiddlewareImpl();
const iController = new IRemovePurchaseController(
    iUseCase,
    iTokenService,
    iEnsureMiddleware
);
const iRemovePurchase: IRemovePurchaseController = iController;

export { iRemovePurchase };