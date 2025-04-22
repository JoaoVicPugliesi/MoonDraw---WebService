import { IAttachProductIntoPurchaseDTO } from '@application/useCases/Purchase/AttachProductIntoPurchase/IAttachProductIntoPurchaseDTO';
import { SelectedProduct } from '@application/useCases/Purchase/InitiatePurchase/IInitiatePurchaseDTO';
import { ISavePurchaseDTO } from '@application/useCases/Purchase/SavePurchase/ISavePurchaseDTO';
import { Product } from '@domain/entities/Product';
import { Purchase } from '@domain/entities/Purchase';
import { IPurchaseRepository } from '@domain/repositories/IPurchaseRepository';
import { prisma } from '@infra/db/Prisma';
import { randomUUID } from 'crypto';

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

  async savePurchase({
    user_id,
    value
  }: ISavePurchaseDTO): Promise<Purchase> {
      const purchase: Purchase = await prisma.purchase.create({
        data: {
          public_id: randomUUID(),
          user_id: user_id,
          value: value
        }
      });

      return purchase;
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
