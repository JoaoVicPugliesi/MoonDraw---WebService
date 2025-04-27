import { Cart } from "@domain/entities/Cart";

export class CartNotFoundErrorResponse extends Error {}

export interface IGetCartResponse {
    cart: Cart
}