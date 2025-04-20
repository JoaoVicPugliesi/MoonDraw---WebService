import { Product } from '@domain/entities/Product';
import { prisma } from '@infra/db/Prisma';
import { IProductRepository } from '@domain/repositories/IProductRepository';
import { ISearchProductsDTO } from '@application/useCases/Product/SearchProducts/ISearchProductsDTO';
import { ISelectProductDTO } from '@application/useCases/Product/SelectProduct/ISelectProductDTO';
import { IFetchProductsDTO } from '@application/useCases/Product/FetchProducts/IFetchProductsDTO';

export class IProductRepositoryPrismaImpl implements IProductRepository {
  async fetchProducts({ 
    page 
  }: IFetchProductsDTO): Promise<Product[] | null> {
    const products: Product[] | null = await prisma.product.findMany({
      skip: 10 * (page - 1),
      take: 10,
    });

    return products;
  }

  async selectProduct({
    public_id,
  }: ISelectProductDTO): Promise<Product | null> {
    const product: Product | null = await prisma.product.findUnique({
      where: {
        public_id: public_id,
      },
    });

    return product;
  }

  async searchProducts({
    name,
  }: ISearchProductsDTO): Promise<Product[] | null> {
    const products: Product[] | null = await prisma.product.findMany({
      where: {
        name: {
          startsWith: name,
          mode: 'insensitive'
        },
      },
    });

    return products;
  }
}
