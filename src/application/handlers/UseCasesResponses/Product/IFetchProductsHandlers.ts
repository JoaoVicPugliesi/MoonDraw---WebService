import { Product } from '@domain/entities/Product';

export class InvalidProductsNotFoundErrorResponse extends Error {}

export interface FetchProductsResponse {
    products: Product[]
}