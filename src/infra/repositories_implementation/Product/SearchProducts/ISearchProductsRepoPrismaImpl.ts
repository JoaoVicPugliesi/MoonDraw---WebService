import { ISearchProductsDTO } from '@application/useCases/Product/SearchProducts/ISearchProductsDTO';
import { Product } from '@domain/entities/Product';
import { ISearchProductsRepo } from '@domain/repositories/Product/ISearchProductsRepo';
import { prisma } from '@infra/db/Prisma';

export class ISearchProductsRepoPrismaImpl implements ISearchProductsRepo {
  async searchProducts({
    name,
  }: ISearchProductsDTO): Promise<Product[] | undefined> {
    const products: Product[] | null = await prisma.product.findMany({
      where: {
        name: {
          startsWith: name,
          mode: 'insensitive'
        },
      },
    });

    if (!products) return undefined;

    return products;
  }
}
