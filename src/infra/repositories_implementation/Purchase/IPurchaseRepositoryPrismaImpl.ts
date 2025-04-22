import { IAttachProductIntoPurchaseDTO } from '@application/useCases/Purchase/AttachProductIntoPurchase/IAttachProductIntoPurchaseDTO';
import { IMeasurePurchaseDTO } from '@application/useCases/Purchase/MeasurePurchase/IMeasurePurchaseDTO';
import { ISavePurchaseDTO } from '@application/useCases/Purchase/SavePurchase/ISavePurchaseDTO';
import { Product } from '@domain/entities/Product';
import { Purchase } from '@domain/entities/Purchase';
import { IPurchaseRepository } from '@domain/repositories/IPurchaseRepository';
import { prisma } from '@infra/db/Prisma';
import { randomUUID } from 'crypto';

export class IPurchaseRepositoryPrismaImpl implements IPurchaseRepository {
  async measurePurchase(DTO: IMeasurePurchaseDTO[]): Promise<number> {
    let value: number = 0;
    for(const p of DTO) {
      const current: Product | null = await prisma.product.findFirst({
        where: {
          public_id: p.product_id,
        },
      });

      if (current) {
        value += current.price * p.quantity;
      }
    };

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
