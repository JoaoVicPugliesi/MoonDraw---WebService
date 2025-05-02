import { Delivery } from "@domain/entities/Delivery"

// Request
export interface ICompletePurchaseDTO {
    purchase_id: string,
    session_id: string
}

// Response
export class PurchaseHasNoOwnerErrorResponse extends Error {};

export interface ICompletePurchaseResponse {}