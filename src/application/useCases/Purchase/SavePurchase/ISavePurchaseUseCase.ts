import { IPurchaseRepository } from '@domain/repositories/IPurchaseRepository';
import { ISavePurchaseDTO } from './ISavePurchaseDTO';
import { Purchase } from '@domain/entities/Purchase';
export class ISavePurchaseUseCase {
  constructor(
    private readonly iPurchaseRepository: IPurchaseRepository
  ) {}

  async execute({ user_id, value }: ISavePurchaseDTO): Promise<Purchase> {
    return await this.iPurchaseRepository.savePurchase({
      user_id,
      value,
    });
  }
}
