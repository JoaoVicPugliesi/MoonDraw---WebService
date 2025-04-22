import { IPurchaseRepository } from '@domain/repositories/IPurchaseRepository';
import { IMeasurePurchaseDTO } from './IMeasurePurchaseDTO';

export class IMeasurePurchaseUseCase {
  constructor(
    private readonly iPurchaseRepository: IPurchaseRepository
  ) {}

  async execute(DTO: IMeasurePurchaseDTO[]): Promise<number> {
    return await this.iPurchaseRepository.measurePurchase(DTO);
  }
}
