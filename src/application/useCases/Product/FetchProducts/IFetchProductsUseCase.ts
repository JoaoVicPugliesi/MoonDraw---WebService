import { IFetchProductsRepo } from "@domain/repositories/Product/IFetchProductsRepo";
import { IFetchProductsDTO } from "./IFetchProductsDTO";
import { Product } from "@domain/entities/Product";
import { FetchProductsResponse, InvalidProductsNotFoundErrorResponse } from "@application/handlers/UseCasesResponses/Product/IFetchProductsHandlers";

export class IFetchProductsUseCase {
    constructor(
        private readonly iFetchProductsRepo: IFetchProductsRepo
    ) {}

    async execute(DTO: IFetchProductsDTO): Promise<FetchProductsResponse | InvalidProductsNotFoundErrorResponse> {
        const products: Product[] | null = await this.iFetchProductsRepo.fetchProducts(DTO);

        if(!products) return new InvalidProductsNotFoundErrorResponse();

        return {
            products: products
        };
    }
}