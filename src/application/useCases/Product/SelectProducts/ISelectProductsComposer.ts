import { ISelectProductsFactory } from '@application/factories/Product/ISelectProductsFactory';
import { ISelectProductsController } from './ISelectProductsController';

const iSelectProductsFactory = new ISelectProductsFactory();
const iSelectProductsUseCase = iSelectProductsFactory.compose();
const iSelectProductsController = new ISelectProductsController(iSelectProductsUseCase);
const selectProducts: ISelectProductsController = iSelectProductsController;

export { selectProducts };