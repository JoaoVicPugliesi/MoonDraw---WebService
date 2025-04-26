import { IPurchaseRepository } from '@domain/repositories/IPurchaseRepository';
import { IMeasurePurchaseDTO } from './IMeasurePurchaseDTO';
import { ICacheProvider } from '@domain/providers/Cache/ICacheProvider';

export class IMeasurePurchaseUseCase {
  constructor(
    private readonly iPurchaseRepository: IPurchaseRepository,
    private readonly iCacheProvider: ICacheProvider
  ) {}

  async execute(DTO: IMeasurePurchaseDTO[]): Promise<number> {
    return await this.iPurchaseRepository.measurePurchase(DTO, this.iCacheProvider);
  }
}
