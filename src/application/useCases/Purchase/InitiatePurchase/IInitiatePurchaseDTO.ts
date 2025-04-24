import { IMeasurePurchaseDTO } from '../MeasurePurchase/IMeasurePurchaseDTO';

export interface IInitiatePurchaseDTO {
    user_id: string,
    title: string,
    selected_products: IMeasurePurchaseDTO[]
}