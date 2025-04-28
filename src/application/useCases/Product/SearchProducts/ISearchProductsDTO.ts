import { IProduct, Product } from '@domain/entities/Product';

// Request
export interface ISearchProductsDTO extends Pick<IProduct, 'name'> {};

// Response
export class SearchedProductsNotFoundErrorResponse extends Error {};

export interface ISearchProductsResponse {
    result: Product[]
}