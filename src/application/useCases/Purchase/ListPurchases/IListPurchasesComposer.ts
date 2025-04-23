import { IListPurchasesFactory } from "@application/factories/Purchase/IListPurchases/IListPurchasesFactory";
import { ITokenServiceJWTImpl } from "@infra/services_implementation/ITokenServiceJWTImpl";
import { IListPurchasesController } from "./IListPurchasesController";

const iFactory = new IListPurchasesFactory();
const iUseCase = iFactory.compose();
const iTokenService = new ITokenServiceJWTImpl();
const iController = new IListPurchasesController(
    iUseCase,
    iTokenService
);
const iListPurchases: IListPurchasesController = iController;

export { iListPurchases };