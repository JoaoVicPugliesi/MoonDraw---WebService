import { IPurchaseRepository } from '@domain/repositories/IPurchaseRepository';
import { ISavePurchaseDTO } from './ISavePurchaseDTO';
import { Purchase } from '@domain/entities/Purchase';
export class ISavePurchaseUseCase {
  constructor(
    private readonly iPurchaseRepository: IPurchaseRepository
  ) {}

  async execute({ 
    buyer_id, 
    title, 
    value 
  }: ISavePurchaseDTO): Promise<Purchase> {
    return await this.iPurchaseRepository.savePurchase({
      buyer_id,
      title,
      value,
    });
  }
}
