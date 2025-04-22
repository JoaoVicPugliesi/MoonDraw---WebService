import { IAttachProductIntoPurchaseDTO } from '@application/useCases/Purchase/AttachProductIntoPurchase/IAttachProductIntoPurchaseDTO';
import { SelectedProduct } from '@application/useCases/Purchase/InitiatePurchase/IInitiatePurchaseDTO';
import { ISavePurchaseDTO } from '@application/useCases/Purchase/SavePurchase/ISavePurchaseDTO';
import { Purchase } from '@domain/entities/Purchase';

export interface IPurchaseRepository {
    measurePurchase(list: SelectedProduct[]): Promise<number>;
    savePurchase(DTO: ISavePurchaseDTO): Promise<Purchase>;
    attachProductIntoPurchase(DTO: IAttachProductIntoPurchaseDTO): Promise<void>;
}