import { IPurchaseRepository } from '@domain/repositories/IPurchaseRepository';
import { IRemovePurchaseDTO } from './IRemovePurchaseDTO';

export class IRemovePurchaseUseCase {
  constructor(
    private readonly iPurchaseRepository: IPurchaseRepository
  ) {}

  async execute({
    public_id
  }: IRemovePurchaseDTO): Promise<void> {
    await this.iPurchaseRepository.removePurchase({
        public_id
    });
  }
}
