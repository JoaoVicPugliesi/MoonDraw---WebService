import { Cart } from '@domain/entities/Cart';

export class InvalidOwnerNotFoundErrorResponse extends Error {};

export interface IAssignCartOwnerResponse {
    cart: Cart
}