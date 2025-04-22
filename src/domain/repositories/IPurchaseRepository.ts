import { SelectedProduct } from "@application/useCases/Purchase/IInitiatePurchase/IInitiatePurchaseDTO";

export interface IPurchaseRepository {
    measurePurchase(list: SelectedProduct[]): Promise<number>;
}