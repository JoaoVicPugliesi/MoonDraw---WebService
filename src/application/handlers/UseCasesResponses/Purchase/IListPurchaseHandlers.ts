import { Purchase } from "@domain/entities/Purchase";

export class PurchasesNotFoundErrorResponse extends Error {}

export interface IListPurchaseResponse {
    purchases: Purchase[]
};