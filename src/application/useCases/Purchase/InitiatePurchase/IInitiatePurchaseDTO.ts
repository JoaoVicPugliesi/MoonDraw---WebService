import { IMeasurePurchaseDTO } from '../MeasurePurchase/IMeasurePurchaseDTO';

// Request
export interface IInitiatePurchaseDTO {
    buyer_id: string,
    title: string,
    selected_products: IMeasurePurchaseDTO[]
}
// Response
export interface Success {
    success: boolean
}
export type IInitiatePurchaseResponse = 
| Success