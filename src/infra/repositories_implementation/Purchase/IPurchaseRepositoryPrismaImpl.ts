import { Product } from '@domain/entities/Product';
import { Purchase } from '@domain/entities/Purchase';
import { prisma } from '@infra/db/Prisma';
import { randomUUID } from 'crypto';
import { ICacheService } from '@domain/services/ICacheService';
import { IPurchaseRepository } from '@domain/repositories/IPurchaseRepository';
import { ISavePurchaseDTO } from '@application/useCases/Purchase/SavePurchase/ISavePurchaseDTO';
import { IMeasurePurchaseDTO } from '@application/useCases/Purchase/MeasurePurchase/IMeasurePurchaseDTO';
import { IAttachProductIntoPurchaseDTO } from '@application/useCases/Purchase/AttachProductIntoPurchase/IAttachProductIntoPurchaseDTO';
import { IListPurchasesDTO } from '@application/useCases/Purchase/ListPurchases/IListPurchasesDTO';

export class IPurchaseRepositoryPrismaImpl implements IPurchaseRepository {
  async measurePurchase(
    DTO: IMeasurePurchaseDTO[],
    iCacheService: ICacheService
  ): Promise<number> {
    let value: number = 0;
    for (const p of DTO) {
      const currentCached: string | null = await iCacheService.get(
        `current-${p.product_id}`
      );

      if (typeof currentCached === 'string') {
        const currentCachedParsed: Product = JSON.parse(currentCached);
        value += currentCachedParsed.price * p.quantity;
      }

      if (!currentCached) {
        const current: Product | null = await prisma.product.findFirst({
          where: {
            public_id: p.product_id,
          },
        });

        if (current) {
          await iCacheService.set(
            `current-${current.public_id}`,
            JSON.stringify(current),
            {
              EX: 1200,
            }
          );
          value += current.price * p.quantity;
        }
      }
    }

    return value;
  }

  async savePurchase({ user_id, value }: ISavePurchaseDTO): Promise<Purchase> {
    const purchase: Purchase = await prisma.purchase.create({
      data: {
        public_id: randomUUID(),
        user_id: user_id,
        value: value,
      },
    });

    return purchase;
  }

  async attachProductIntoPurchase({
    purchase_id,
    product_id,
    quantity,
  }: IAttachProductIntoPurchaseDTO): Promise<void> {
    await prisma.pivot_Purchase_Product.create({
      data: {
        purchase_id,
        product_id,
        quantity,
      },
    });
  }

  async listPurchases({
    user_id,
    status,
  }: IListPurchasesDTO): Promise<Purchase[] | null> {
    const purchases: Purchase[] | null = await prisma.purchase.findMany({
      where: {
        user_id: user_id,
        status: status,
      },
      include: {
        products: {
          include: {
            product: true,
          },
        },
      }
    });

    return purchases;
  }
}
