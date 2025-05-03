import { ISaveProductFactory } from '@application/factories/Product/SaveProduct/ISaveProductFactory';
import { ITokenServiceJWTImpl } from '@infra/services/ITokenServiceJWTImpl';
import { ISaveProductController } from './ISaveProductController';
import { IEnsureAuthMiddlewareImpl } from '@application/middlewares/Auth/IEnsureAuthMiddlewareImpl';
import { IProductValidatorZodImpl } from '@application/validators/Request/Product/IProductValidatorZodImpl';

const iFactory = new ISaveProductFactory();
const iUseCase = iFactory.compose();
const iTokenService = new ITokenServiceJWTImpl();
const iValidator = new IProductValidatorZodImpl();
const iEnsureAuthMiddleware = new IEnsureAuthMiddlewareImpl();
const iController = new ISaveProductController(
  iUseCase,
  iTokenService,
  iValidator,
  iEnsureAuthMiddleware
);
const iSaveProduct: ISaveProductController = iController;

export { iSaveProduct };
