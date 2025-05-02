import { IMeasurePurchaseDTO } from '../MeasurePurchase/IMeasurePurchaseDTO';

export interface IInitiatePurchaseDTO {
    buyer_id: string,
    title: string,
    selected_products: IMeasurePurchaseDTO[]
}