import { Purchase } from '@domain/entities/Purchase';
import { IPurchaseRepository } from '@domain/repositories/IPurchaseRepository';
import { ISavePurchaseUseCase } from '../SavePurchase/ISavePurchaseUseCase';
import { IAttachProductIntoPurchaseUseCase } from '../AttachProductIntoPurchase/IAttachProductIntoPurchaseUseCase';
import { IInitiatePurchaseDTO } from './IInitiatePurchaseDTO';

export class IInitiatePurchaseUseCase {
  constructor(
    private readonly iPurchaseRepository: IPurchaseRepository,
    private readonly iSavePurchaseUseCase: ISavePurchaseUseCase,
    private readonly iAttachProductIntoPurchaseUseCase: IAttachProductIntoPurchaseUseCase
  ) {}

  async execute({ 
    user_id, 
    selected_products 
  }: IInitiatePurchaseDTO): Promise<void> {
    const value: number = await this.iPurchaseRepository.measurePurchase(
      selected_products
    );

    const purchase: Purchase = await this.iSavePurchaseUseCase.execute({
      user_id,
      value,
    });
    for(const p of selected_products) {
      await this.iAttachProductIntoPurchaseUseCase.execute({
        purchase_id: purchase.public_id,
        product_id: p.product_id,
        quantity: p.quantity,
      });
    };
  }
}
