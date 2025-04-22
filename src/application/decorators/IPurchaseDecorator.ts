import { IAttachProductIntoPurchaseDTO } from '@application/useCases/Purchase/AttachProductIntoPurchase/IAttachProductIntoPurchaseDTO';
import { IMeasurePurchaseDTO } from '@application/useCases/Purchase/MeasurePurchase/IMeasurePurchaseDTO';
import { ISavePurchaseDTO } from '@application/useCases/Purchase/SavePurchase/ISavePurchaseDTO';
import { Purchase } from '@domain/entities/Purchase';
import { IPurchaseRepository } from '@domain/repositories/IPurchaseRepository';
import { ICacheService } from '@domain/services/ICacheService';
import { IPurchaseRepositoryPrismaImpl } from '@infra/repositories_implementation/Purchase/IPurchaseRepositoryPrismaImpl';

export class IPurchaseDecorator implements IPurchaseRepository {
  constructor(
    private readonly decoratee: IPurchaseRepository
  ) {}

  async measurePurchase(DTO: IMeasurePurchaseDTO[], iCacheService: ICacheService): Promise<number> {
      return await this.decoratee.measurePurchase(DTO, iCacheService);
  }

  async savePurchase({ 
    user_id,
    value
   }: ISavePurchaseDTO): Promise<Purchase> {
      return await this.decoratee.savePurchase({
        user_id,
        value
      });
  }

  async attachProductIntoPurchase({
    purchase_id,
    product_id,
    quantity
  }: IAttachProductIntoPurchaseDTO): Promise<void> {
      await this.decoratee.attachProductIntoPurchase({
        purchase_id,
        product_id,
        quantity
      });
  }
}

const decoratee = new IPurchaseRepositoryPrismaImpl();
const iPurchaseDecorator = new IPurchaseDecorator(decoratee);
export { iPurchaseDecorator };