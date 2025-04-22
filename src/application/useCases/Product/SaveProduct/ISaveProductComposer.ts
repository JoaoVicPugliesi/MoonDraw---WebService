import { ISaveProductFactory } from "@application/factories/Product/SaveProduct/ISaveProductFactory";
import { ITokenServiceJWTImpl } from "@infra/services_implementation/ITokenServiceJWTImpl";
import { ISaveProductValidator } from "@application/validators/ISaveProductValidator";
import { ISaveProductController } from "./ISaveProductController";

const iFactory = new ISaveProductFactory();
const iUseCase = iFactory.compose();
const iTokenService = new ITokenServiceJWTImpl();
const iValidator = new ISaveProductValidator();
const iController = new ISaveProductController(
  iUseCase,
  iTokenService,
  iValidator
);
const iSaveProduct: ISaveProductController = iController;

export { iSaveProduct };
