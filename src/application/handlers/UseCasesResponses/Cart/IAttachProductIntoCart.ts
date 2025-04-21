import { Product } from "@domain/entities/Product";

export class InvalidAttachmentAlreadyExistsErrorResponse extends Error {}
export class InvalidCartEmptyErrorResponse extends Error {};

export interface IAttachProductIntoCartResponse {
    content: Product[]
}