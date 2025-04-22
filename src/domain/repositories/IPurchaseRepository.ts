import { Purchase } from '@domain/entities/Purchase';
import { ICacheService } from '@domain/services/ICacheService';
import { ISavePurchaseDTO } from '@application/useCases/Purchase/SavePurchase/ISavePurchaseDTO';
import { IMeasurePurchaseDTO } from '@application/useCases/Purchase/MeasurePurchase/IMeasurePurchaseDTO';
import { IAttachProductIntoPurchaseDTO } from '@application/useCases/Purchase/AttachProductIntoPurchase/IAttachProductIntoPurchaseDTO';
import { IListPurchasesDTO } from '@application/useCases/Purchase/ListPurchases/IListPurchasesDTO';

export interface IPurchaseRepository {
    measurePurchase(
        DTO: IMeasurePurchaseDTO[],
        iCacheService: ICacheService
    ): Promise<number>;
    savePurchase(DTO: ISavePurchaseDTO): Promise<Purchase>;
    attachProductIntoPurchase(DTO: IAttachProductIntoPurchaseDTO): Promise<void>;
    listPurchases(DTO: IListPurchasesDTO): Promise<Purchase[] | null>;
}