import { IAttachProductIntoPurchaseDTO } from '@application/useCases/Purchase/AttachProductIntoPurchase/IAttachProductIntoPurchaseDTO';
import { ICheckoutPurchaseDTO } from '@application/useCases/Purchase/CheckoutPurchase/ICheckoutPurchaseDTO';
import { ICompletePurchaseDTO } from '@application/useCases/Purchase/CompletePurchase/ICompletePurchaseDTO';
import { IListPurchasesDTO } from '@application/useCases/Purchase/ListPurchases/IListPurchasesDTO';
import { IMeasurePurchaseDTO } from '@application/useCases/Purchase/MeasurePurchase/IMeasurePurchaseDTO';
import { IRemovePurchaseDTO } from '@application/useCases/Purchase/RemovePurchase/IRemovePurchaseDTO';
import { ISavePurchaseDTO } from '@application/useCases/Purchase/SavePurchase/ISavePurchaseDTO';
import { Purchase } from '@domain/entities/Purchase';
import {
  CheckoutPurchase,
  IPurchaseRepository,
} from '@domain/repositories/IPurchaseRepository';
import { ICacheProvider } from '@domain/providers/Cache/ICacheProvider';
import { IPurchaseRepositoryPrismaImpl } from '@infra/repositories/Purchase/IPurchaseRepositoryPrismaImpl';

export class IPurchaseDecorator implements IPurchaseRepository {
  constructor(private readonly decoratee: IPurchaseRepository) {}

  async measurePurchase(
    DTO: IMeasurePurchaseDTO[],
    iCacheProvider: ICacheProvider
  ): Promise<number> {
    return await this.decoratee.measurePurchase(DTO, iCacheProvider);
  }

  async savePurchase({
    buyer_id,
    title,
    value,
  }: ISavePurchaseDTO): Promise<Purchase> {
    return await this.decoratee.savePurchase({
      buyer_id,
      title,
      value,
    });
  }

  async attachProductIntoPurchase({
    purchase_id,
    product_id,
    quantity,
  }: IAttachProductIntoPurchaseDTO): Promise<void> {
    await this.decoratee.attachProductIntoPurchase({
      purchase_id,
      product_id,
      quantity,
    });
  }

  async listPurchases({
    buyer_id,
    status,
  }: IListPurchasesDTO): Promise<Purchase[] | null> {
    return await this.decoratee.listPurchases({
      buyer_id,
      status,
    });
  }

  async checkoutPurchase({
    public_id,
  }: ICheckoutPurchaseDTO): Promise<CheckoutPurchase[] | null> {
    return await this.decoratee.checkoutPurchase({
      public_id,
    });
  }

  async removePurchase({ public_id }: IRemovePurchaseDTO): Promise<void> {
    await this.decoratee.removePurchase({
      public_id,
    });
  }

  async completePurchase({
    purchase_id,
    payment_method
  } : { purchase_id: string, payment_method: string }): Promise<void> {
    await this.decoratee.completePurchase({
      purchase_id,
      payment_method
    });
  }

  async findPurchaseOwner({
    purchase_id,
  }: Pick<ICompletePurchaseDTO, 'purchase_id'>): Promise<Pick<
    Purchase,
    'buyer_id'
  > | null> {
    return await this.decoratee.findPurchaseOwner({
      purchase_id,
    });
  }
}

const decoratee = new IPurchaseRepositoryPrismaImpl();
const iPurchaseDecorator = new IPurchaseDecorator(decoratee);
export { iPurchaseDecorator };
