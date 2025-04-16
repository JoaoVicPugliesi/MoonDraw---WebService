import { ISelectProductsDTO } from "@application/useCases/Product/SelectProducts/ISelectProductsDTO";
import { Product } from "@domain/entities/Product";

export interface ISelectProductsRepo {
    selectProducts(DTO: ISelectProductsDTO): Promise<Product[] | null>
}