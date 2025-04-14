import { IFetchProductsRepo } from "@domain/repositories/Product/IFetchProductsRepo";
import { IFetchProductsDTO } from "./IFetchProductsDTO";
import { Product } from "@domain/entities/Product";

export class IFetchProducts {
    constructor(
        private readonly iFetchProductsRepo: IFetchProductsRepo
    ) {}

    async execute(DTO: IFetchProductsDTO): Promise<Product[] | null> {
        const products: Product[] | null = await this.iFetchProductsRepo.fetchProducts(DTO);

        if(!products) return null;

        return products;
    }
}