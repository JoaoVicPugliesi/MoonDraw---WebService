import { Product } from "@domain/entities/Product";

export class InvalidCartEmptyErrorResponse extends Error {}

export interface IListCartContentResponse {
    content: Product[]
}