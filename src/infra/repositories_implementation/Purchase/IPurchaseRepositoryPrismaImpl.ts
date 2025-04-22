import { IAttachProductIntoPurchaseDTO } from '@application/useCases/Purchase/IAttachProductIntoPurchase/IAttachProductIntoPurchaseDTO';
import { SelectedProduct } from '@application/useCases/Purchase/IInitiatePurchase/IInitiatePurchaseDTO';
import { Product } from '@domain/entities/Product';
import { IPurchaseRepository } from '@domain/repositories/IPurchaseRepository';
import { prisma } from '@infra/db/Prisma';

export class IPurchaseRepositoryPrismaImpl implements IPurchaseRepository {
  async measurePurchase(list: SelectedProduct[]): Promise<number> {
    let value: number = 0;
    let current: Product | null;
    list.forEach(async (p: SelectedProduct) => {
      current = await prisma.product.findFirst({
        where: {
          public_id: p.product_id,
        },
      });

      if (current) {
        value += current.price * p.quantity;
      }
    });

    return value;
  }

  async attachProductIntoPurchase({
    purchase_id,
    product_id,
    quantity
  }: IAttachProductIntoPurchaseDTO): Promise<void> {
      await prisma.pivot_Purchase_Product.create({
        data: {
          purchase_id,
          product_id,
          quantity
        }
      })
  }
}
