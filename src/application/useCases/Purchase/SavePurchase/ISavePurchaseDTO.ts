import { Purchase } from "@domain/entities/Purchase"

// Request
export interface ISavePurchaseDTO {
    buyer_id: string,
    title: string,
    value: number
}
// Response
export interface Success {
    purchase: Purchase
}
export type ISavePurchaseResponse = 
| Success