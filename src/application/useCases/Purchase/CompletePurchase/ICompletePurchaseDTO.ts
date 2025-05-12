// Request
export interface ICompletePurchaseDTO {
    purchase_id: string,
    session_id: string
}

// Response
export class PurchaseHasNoOwnerErrorResponse extends Error {};
export interface Success {
    success: boolean
}
export type ICompletePurchaseResponse = 
| PurchaseHasNoOwnerErrorResponse
| Success