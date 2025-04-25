import { Delivery } from "@domain/entities/Delivery";

export class PurchaseHasNoOwnerErrorResponse extends Error {};

export interface ICompletePurchaseResponse {
    delivery: Delivery
}