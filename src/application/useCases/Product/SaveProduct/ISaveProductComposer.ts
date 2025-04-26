import { ISaveProductFactory } from '@application/factories/Product/SaveProduct/ISaveProductFactory';
import { ITokenServiceJWTImpl } from '@infra/services_implementation/ITokenServiceJWTImpl';
import { ISaveProductController } from './ISaveProductController';
import { IEnsureMiddlewareImpl } from '@application/middlewares/IEnsureMiddlewareImpl';
import { IProductValidatorZodImpl } from '@application/validators/Product/IProductValidatorZodImpl';

const iFactory = new ISaveProductFactory();
const iUseCase = iFactory.compose();
const iTokenService = new ITokenServiceJWTImpl();
const iValidator = new IProductValidatorZodImpl();
const iEnsureMiddlware = new IEnsureMiddlewareImpl();
const iController = new ISaveProductController(
  iUseCase,
  iTokenService,
  iValidator,
  iEnsureMiddlware
);
const iSaveProduct: ISaveProductController = iController;

export { iSaveProduct };
