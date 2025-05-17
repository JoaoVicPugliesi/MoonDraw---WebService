import { IPurchaseRepository } from '@domain/repositories/IPurchaseRepository';
import { ISavePurchaseDTO, ISavePurchaseResponse } from './ISavePurchaseDTO';
import { Purchase } from '@domain/entities/Purchase';
export class ISavePurchaseUseCase {
  constructor(
    private readonly iPurchaseRepository: IPurchaseRepository
  ) {}

  async execute({ 
    buyer_id, 
    title, 
    value 
  }: ISavePurchaseDTO): Promise<ISavePurchaseResponse> {
    const purchase: Purchase = await this.iPurchaseRepository.savePurchase({
      buyer_id,
      title,
      value,
    });
    return {
      purchase: purchase
    }
  }
}
