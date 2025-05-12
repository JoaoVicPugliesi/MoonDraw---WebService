import { Purchase } from '@domain/entities/Purchase';

// Request
export interface IListPurchasesDTO extends Pick<Purchase, 'buyer_id' | 'status'> {};

// Response
export class PurchasesNotFoundErrorResponse extends Error {}
export interface Success {
    purchases: Purchase[]
};
export type IListPurchaseResponse =
| PurchasesNotFoundErrorResponse
| Success