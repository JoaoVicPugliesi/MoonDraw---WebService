import { IAttachProductIntoPurchaseDTO } from '@application/useCases/Purchase/AttachProductIntoPurchase/IAttachProductIntoPurchaseDTO';
import { IMeasurePurchaseDTO } from '@application/useCases/Purchase/MeasurePurchase/IMeasurePurchaseDTO';
import { ISavePurchaseDTO } from '@application/useCases/Purchase/SavePurchase/ISavePurchaseDTO';
import { Purchase } from '@domain/entities/Purchase';

export interface IPurchaseRepository {
    measurePurchase(DTO: IMeasurePurchaseDTO[]): Promise<number>;
    savePurchase(DTO: ISavePurchaseDTO): Promise<Purchase>;
    attachProductIntoPurchase(DTO: IAttachProductIntoPurchaseDTO): Promise<void>;
}