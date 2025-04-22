import { IMeasurePurchaseDTO } from '../MeasurePurchase/IMeasurePurchaseDTO';

export interface IInitiatePurchaseDTO {
    user_id: string,
    selected_products: IMeasurePurchaseDTO[]
}