import { Product } from '@domain/entities/Product';

export class SearchedProductsNotFoundErrorResponse extends Error {};

export interface ISearchProductsResponse {
    result: Product[]
}