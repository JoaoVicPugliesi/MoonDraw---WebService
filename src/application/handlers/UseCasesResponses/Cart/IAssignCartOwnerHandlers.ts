import { Cart } from '@domain/entities/Cart';

export class OwnerNotFoundErrorResponse extends Error {};

export interface IAssignCartOwnerResponse {
    cart: Cart
}