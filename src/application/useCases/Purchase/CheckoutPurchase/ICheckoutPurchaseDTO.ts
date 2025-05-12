import { IPurchase } from '@domain/entities/Purchase';

// Request
export interface ICheckoutPurchaseDTO extends Pick<IPurchase, 'public_id'> {};

// Response
export class PurchaseNotFoundErrorResponse extends Error {}
export interface Success {
    url: string
}
export type ICheckoutPurchaseResponse = 
| PurchaseNotFoundErrorResponse
| Success