import { Purchase } from "@domain/entities/Purchase";

// Request
export interface IListPurchasesDTO extends Pick<Purchase, 'user_id' | 'status'> {};

// Response
export class PurchasesNotFoundErrorResponse extends Error {}

export interface IListPurchaseResponse {
    purchases: Purchase[]
};