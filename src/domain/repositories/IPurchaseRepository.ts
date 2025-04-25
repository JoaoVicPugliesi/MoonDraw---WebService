import { ICheckoutPurchaseDTO } from './../../application/useCases/Purchase/CheckoutPurchase/ICheckoutPurchaseDTO';
import { Purchase } from '@domain/entities/Purchase';
import { ICacheService } from '@domain/services/ICacheService';
import { ISavePurchaseDTO } from '@application/useCases/Purchase/SavePurchase/ISavePurchaseDTO';
import { IMeasurePurchaseDTO } from '@application/useCases/Purchase/MeasurePurchase/IMeasurePurchaseDTO';
import { IAttachProductIntoPurchaseDTO } from '@application/useCases/Purchase/AttachProductIntoPurchase/IAttachProductIntoPurchaseDTO';
import { IListPurchasesDTO } from '@application/useCases/Purchase/ListPurchases/IListPurchasesDTO';
import { Product } from '@domain/entities/Product';
import { IRemovePurchaseDTO } from '@application/useCases/Purchase/RemovePurchase/IRemovePurchaseDTO';
import { ICompletePurchaseDTO } from '@application/useCases/Purchase/CompletePurchase/ICompletePurchaseDTO';

export interface CheckoutPurchase {
  purchase_id: string;
  product_id: string;
  quantity: number;
  product: Product;
}



export interface IPurchaseRepository {
  measurePurchase(
    DTO: IMeasurePurchaseDTO[],
    iCacheService: ICacheService
  ): Promise<number>;
  savePurchase(DTO: ISavePurchaseDTO): Promise<Purchase>;
  attachProductIntoPurchase(DTO: IAttachProductIntoPurchaseDTO): Promise<void>;
  listPurchases(DTO: IListPurchasesDTO): Promise<Purchase[] | null>;
  checkoutPurchase(
    DTO: ICheckoutPurchaseDTO
  ): Promise<CheckoutPurchase[] | null>;
  removePurchase(DTO: IRemovePurchaseDTO): Promise<void>;
  completePurchase(DTO: { purchase_id: string, payment_method: string }): Promise<void>;
  findPurchaseOwner(DTO: Pick<ICompletePurchaseDTO, 'purchase_id'>): Promise<Pick<Purchase, 'user_id'> | null>;
}
