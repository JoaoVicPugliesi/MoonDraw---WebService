import { Product } from '@domain/entities/Product';

export class InvalidProductsNotFoundErrorResponse extends Error {}

export interface SelectProductsResponse {
    products: Product[]
}