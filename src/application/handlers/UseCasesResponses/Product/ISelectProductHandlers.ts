import { Product } from '@domain/entities/Product';

export class ProductNotFoundErrorResponse extends Error {}

export interface SelectProductResponse {
    product: Product
}