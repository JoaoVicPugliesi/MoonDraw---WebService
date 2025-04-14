import { IFetchProductsDTO } from "@application/useCases/Product/FetchProducts/IFetchProductsDTO";
import { Product } from "@domain/entities/Product";

export interface IFetchProductsRepo {
    fetchProducts(DTO: IFetchProductsDTO): Promise<Product[] | null>
}