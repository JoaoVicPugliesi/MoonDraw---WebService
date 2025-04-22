import { IPurchaseRepository } from '@domain/repositories/IPurchaseRepository';
import { IMeasurePurchaseDTO } from './IMeasurePurchaseDTO';
import { ICacheService } from '@domain/services/ICacheService';

export class IMeasurePurchaseUseCase {
  constructor(
    private readonly iPurchaseRepository: IPurchaseRepository,
    private readonly iCacheService: ICacheService
  ) {}

  async execute(DTO: IMeasurePurchaseDTO[]): Promise<number> {
    return await this.iPurchaseRepository.measurePurchase(DTO, this.iCacheService);
  }
}
