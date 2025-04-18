import { ISearchProductsDTO } from '@application/useCases/Product/SearchProducts/ISearchProductsDTO';
import { Product } from '@domain/entities/Product';

export interface ISearchProductsRepo {
    searchProducts(DTO: ISearchProductsDTO): Promise<Product[] | undefined>; 
}