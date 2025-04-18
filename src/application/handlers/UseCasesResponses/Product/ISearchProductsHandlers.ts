import { Product } from "@domain/entities/Product";

export class InvalidSearchedProductsNotFoundErrorResponse extends Error {};

export interface ISearchProductsResponse {
    search: Product[]
}