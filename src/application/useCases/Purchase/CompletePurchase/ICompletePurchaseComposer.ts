import { ICompletePurchaseFactory } from './../../../factories/Purchase/CompletePurchase/ICompletePurchaseFactory';
import { ITokenServiceJWTImpl } from '@infra/services/ITokenServiceJWTImpl';
import { ICompletePurchaseController } from './ICompletePurchaseController';
import { IEnsureMiddlewareImpl } from '@application/middlewares/IEnsureMiddlewareImpl';
import { IPurchaseValidatorZodImpl } from '@application/validators/Request/Purchase/IPurchaseValidatorZodImpl';

const iFactory = new ICompletePurchaseFactory();
const iUseCase = iFactory.compose();
const iTokenService = new ITokenServiceJWTImpl();
const iEnsureMiddleware = new IEnsureMiddlewareImpl();
const iValidator = new IPurchaseValidatorZodImpl();
const iController = new ICompletePurchaseController(iUseCase, iTokenService, iValidator, iEnsureMiddleware);
const iCompletePurchase: ICompletePurchaseController = iController;

export { iCompletePurchase };
