import { Product } from '@domain/entities/Product';

export class CartEmptyErrorResponse extends Error {}

export interface IListCartContentResponse {
    content: Product[]
}