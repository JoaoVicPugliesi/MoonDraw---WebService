import { IMeasurePurchaseDTO } from '../MeasurePurchase/IMeasurePurchaseDTO';

export interface IInitiatePurchaseDTO {
    user_id: string,
    name: string,
    selected_products: IMeasurePurchaseDTO[]
}