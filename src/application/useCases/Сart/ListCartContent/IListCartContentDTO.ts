import { Cart } from "@domain/entities/Cart";

export interface IListCartContentDTO extends Pick<Cart, 'public_id'> {}