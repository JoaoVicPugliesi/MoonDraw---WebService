import { Cart } from '@domain/entities/Cart';
import { Product } from '@domain/entities/Product';

// Request
export interface IListCartContentDTO extends Pick<Cart, 'public_id'> {};

// Response
export class CartEmptyErrorResponse extends Error {}
export interface Success {
    content: Product[]
}

export type IListCartContentResponse =
| CartEmptyErrorResponse
| Success