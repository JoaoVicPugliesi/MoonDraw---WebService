import { IListCartContentFactory } from '@application/factories/Cart/ListCartContent/IListCartContentFactory';
import { IListCartContentController } from './IListCartContentController';
import { ITokenServiceJWTImpl } from '@infra/services_implementation/ITokenServiceJWTImpl';

const iFactory = new IListCartContentFactory();
const iUseCase = iFactory.compose();
const iTokenService = new ITokenServiceJWTImpl();
const iController = new IListCartContentController(iUseCase, iTokenService);
const iListCartContent: IListCartContentController = iController;

export { iListCartContent };
