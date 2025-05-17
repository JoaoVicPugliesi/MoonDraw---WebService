import { IPurchaseRepository } from '@domain/repositories/IPurchaseRepository';
import { IRemovePurchaseDTO, IRemovePurchaseResponse } from './IRemovePurchaseDTO';

export class IRemovePurchaseUseCase {
  constructor(
    private readonly iPurchaseRepository: IPurchaseRepository
  ) {}

  async execute({
    public_id
  }: IRemovePurchaseDTO): Promise<IRemovePurchaseResponse> {
    await this.iPurchaseRepository.removePurchase({
        public_id
    });
    return {
      success: true
    }
  }
}
