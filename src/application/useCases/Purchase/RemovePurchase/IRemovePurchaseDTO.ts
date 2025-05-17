import { IPurchase } from "@domain/entities/Purchase";
// Request
export interface IRemovePurchaseDTO extends Pick<IPurchase, 'public_id'> {}

// Response
export interface Success {
    success: boolean
}
export type IRemovePurchaseResponse =
| Success