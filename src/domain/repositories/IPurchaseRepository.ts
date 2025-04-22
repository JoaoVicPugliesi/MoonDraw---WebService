import { IAttachProductIntoPurchaseDTO } from '@application/useCases/Purchase/IAttachProductIntoPurchase/IAttachProductIntoPurchaseDTO';
import { SelectedProduct } from '@application/useCases/Purchase/IInitiatePurchase/IInitiatePurchaseDTO';

export interface IPurchaseRepository {
    measurePurchase(list: SelectedProduct[]): Promise<number>;
    attachProductIntoPurchase(DTO: IAttachProductIntoPurchaseDTO): Promise<void>;
}