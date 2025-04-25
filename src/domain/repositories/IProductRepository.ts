import { Product } from '@domain/entities/Product';
import { ISelectProductDTO } from '@application/useCases/Product/SelectProduct/ISelectProductDTO';
import { IFetchProductsDTO } from '@application/useCases/Product/FetchProducts/IFetchProductsDTO';
import { ISearchProductsDTO } from '@application/useCases/Product/SearchProducts/ISearchProductsDTO';
import { ISaveProductDTO } from '@application/useCases/Product/SaveProduct/ISaveProductDTO';

export interface IProductRepository {
    fetchProducts(DTO: IFetchProductsDTO): Promise<Product[] | null>;
    selectProduct(DTO: ISelectProductDTO): Promise<Product | null>;
    searchProducts(DTO: ISearchProductsDTO): Promise<Product[] | null>; 
    saveProduct(DTO: ISaveProductDTO): Promise<void>;
    findProductByName(DTO: Pick<Product, 'name'>): Promise<Product | null>;
}