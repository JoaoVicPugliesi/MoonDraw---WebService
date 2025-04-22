import { IInitiatePurchaseFactory } from '@application/factories/Purchase/InitiatePurchase/IInitiatePurchaseFactory';
import { ITokenServiceJWTImpl } from '@infra/services_implementation/ITokenServiceJWTImpl';
import { IInitiatePurchaseValidator } from '@application/validators/IInitiatePurchaseValidator';
import { IInitiatePurchaseController } from './IInitiatePurchaseController';

const iFactory = new IInitiatePurchaseFactory();
const iUseCase = iFactory.compose();
const iTokenService = new ITokenServiceJWTImpl();
const iValidator = new IInitiatePurchaseValidator();
const iController = new IInitiatePurchaseController(
  iUseCase,
  iTokenService,
  iValidator
);
const iInitiatePurchase: IInitiatePurchaseController = iController;

export { iInitiatePurchase };
