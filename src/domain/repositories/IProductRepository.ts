import { Product } from '@domain/entities/Product';
import { ISelectProductDTO } from '@application/useCases/Product/SelectProduct/ISelectProductDTO';
import { IFetchProductsDTO } from '@application/useCases/Product/FetchProducts/IFetchProductsDTO';
import { ISearchProductsDTO } from '@application/useCases/Product/SearchProducts/ISearchProductsDTO';

export interface IProductRepository {
    fetchProducts(DTO: IFetchProductsDTO): Promise<Product[] | null>
    selectProduct(DTO: ISelectProductDTO): Promise<Product | undefined>;
    searchProducts(DTO: ISearchProductsDTO): Promise<Product[] | undefined>; 
}