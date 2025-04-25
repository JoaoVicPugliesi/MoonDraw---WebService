import { Product } from '@domain/entities/Product';

export class ProductsNotFoundErrorResponse extends Error {}

export interface FetchProductsResponse {
    products: Product[]
}