import { Product } from "@domain/entities/Product";

export class InvalidProductNotFoundErrorResponse extends Error {}

export interface SelectProductResponse {
    product: Product
}