import { IPurchaseRepository } from '@domain/repositories/IPurchaseRepository';
import { IAttachProductIntoPurchaseDTO, IAttachProductIntoPurchaseResponse } from './IAttachProductIntoPurchaseDTO';

export class IAttachProductIntoPurchaseUseCase {
  constructor(
    private readonly iPurchaseRepository: IPurchaseRepository
  ) {}

  async execute({
    purchase_id,
    product_id,
    quantity,
  }: IAttachProductIntoPurchaseDTO): Promise<IAttachProductIntoPurchaseResponse> {
    await this.iPurchaseRepository.attachProductIntoPurchase({
        purchase_id,
        product_id,
        quantity
    });

    return {
      success: true
    }
  }
}
