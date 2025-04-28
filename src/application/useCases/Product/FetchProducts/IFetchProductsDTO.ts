import { Product } from "@domain/entities/Product";

// Request
export interface IFetchProductsDTO {
    page: number,
}

// Response
export class ProductsNotFoundErrorResponse extends Error {}

export interface FetchProductsResponse {
    products: Product[]
}