import { Product } from '@domain/entities/Product';
import { Purchase } from '@domain/entities/Purchase';
import { prisma } from '@infra/db/Prisma';
import { v4 as uuidv4 } from 'uuid';
import { ICacheProvider } from '@domain/providers/Cache/ICacheProvider';
import {
  CheckoutPurchase,
  IPurchaseRepository,
} from '@domain/repositories/IPurchaseRepository';
import { ISavePurchaseDTO } from '@application/useCases/Purchase/SavePurchase/ISavePurchaseDTO';
import { IMeasurePurchaseDTO } from '@application/useCases/Purchase/MeasurePurchase/IMeasurePurchaseDTO';
import { IAttachProductIntoPurchaseDTO } from '@application/useCases/Purchase/AttachProductIntoPurchase/IAttachProductIntoPurchaseDTO';
import { IListPurchasesDTO } from '@application/useCases/Purchase/ListPurchases/IListPurchasesDTO';
import { ICheckoutPurchaseDTO } from '@application/useCases/Purchase/CheckoutPurchase/ICheckoutPurchaseDTO';
import { IRemovePurchaseDTO } from '@application/useCases/Purchase/RemovePurchase/IRemovePurchaseDTO';
import { ICompletePurchaseDTO } from '@application/useCases/Purchase/CompletePurchase/ICompletePurchaseDTO';

export class IPurchaseRepositoryPrismaImpl implements IPurchaseRepository {
  async measurePurchase(
    DTO: IMeasurePurchaseDTO[],
    iCacheProvider: ICacheProvider
  ): Promise<number> {
    let value: number = 0;
    for (const p of DTO) {
      const currentCached: string | null = await iCacheProvider.get(
        `current-${p.product_id}`
      );

      if (currentCached) {
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
          await iCacheProvider.set(
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

  async savePurchase({
    user_id,
    title,
    value,
  }: ISavePurchaseDTO): Promise<Purchase> {
    const purchase: Purchase = await prisma.purchase.create({
      data: {
        public_id: uuidv4(),
        user_id: user_id,
        title: title,
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
    });

    return purchases;
  }

  async checkoutPurchase({
    public_id,
  }: ICheckoutPurchaseDTO): Promise<CheckoutPurchase[] | null> {
    const purchase: CheckoutPurchase[] | null =
      await prisma.pivot_Purchase_Product.findMany({
        where: {
          purchase_id: public_id,
        },
        include: {
          product: true,
        },
      });

    return purchase;
  }

  async removePurchase({ public_id }: IRemovePurchaseDTO): Promise<void> {
    await prisma.purchase.delete({
      where: {
        public_id: public_id,
        status: 'pending',
      },
    });
  }

  async completePurchase({
    purchase_id,
    payment_method
  }: { purchase_id: string, payment_method: string }): Promise<void> {
    await prisma.purchase.update({
      where: {
        public_id: purchase_id,
      },
      data: {
        status: 'completed',
        completed_at: new Date(),
        payment_method: payment_method
      },
    });
  }

  async findPurchaseOwner({
    purchase_id,
  }: Pick<ICompletePurchaseDTO, 'purchase_id'>): Promise<Pick<Purchase, 'user_id'> | null> {
    const purchase: Purchase | null = await prisma.purchase.findUnique({
      where: {
        public_id: purchase_id,
      },
    });

    if (purchase) {
      return {
        user_id: purchase.user_id
      };
    }

    return null;
  }
}
