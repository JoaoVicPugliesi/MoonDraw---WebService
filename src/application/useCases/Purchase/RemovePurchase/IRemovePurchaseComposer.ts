import { IRemovePurchaseFactory } from '@application/factories/Purchase/RemovePurchase/IRemovePurchaseFactory';
import { ITokenServiceJWTImpl } from '@infra/services/ITokenServiceJWTImpl';
import { IRemovePurchaseController } from './IRemovePurchaseController';
import { IEnsureAuthMiddlewareImpl } from '@application/middlewares/Auth/IEnsureAuthMiddlewareImpl';

const iFactory = new IRemovePurchaseFactory();
const iUseCase = iFactory.compose();
const iTokenService = new ITokenServiceJWTImpl();
const iEnsureAuthMiddleware = new IEnsureAuthMiddlewareImpl();
const iController = new IRemovePurchaseController(
    iUseCase,
    iTokenService,
    iEnsureAuthMiddleware
);
const iRemovePurchase: IRemovePurchaseController = iController;

export { iRemovePurchase };