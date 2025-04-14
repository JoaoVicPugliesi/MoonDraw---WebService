import { IFetchProductsRepoPrismaImpl } from '@infra/repositories_implementation/Product/FetchProducts/IFetchProductsRepoPrismaImpl';
import { IFetchProductsUseCase } from "./IFetchProductsUseCase";
import { IFetchProductsController } from "./IFetchProductsController";

const iFetchProductsRepoPrismaImpl = new IFetchProductsRepoPrismaImpl();
const iFetchProductsUseCase = new IFetchProductsUseCase(iFetchProductsRepoPrismaImpl);
const iFetchProductsController = new IFetchProductsController(iFetchProductsUseCase);
const fetchProducts: IFetchProductsController = iFetchProductsController;

export { fetchProducts };