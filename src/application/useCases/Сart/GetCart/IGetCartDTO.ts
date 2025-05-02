import { Cart, ICart } from '@domain/entities/Cart';

// Request
export interface IGetCartDTO extends Pick<ICart, 'owner_id'> {};

// Response
export class CartNotFoundErrorResponse extends Error {}

export interface IGetCartResponse {
    cart: Cart
}