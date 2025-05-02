import { FetchProductsResponse, IFetchProductsDTO, ProductsNotFoundErrorResponse } from './IFetchProductsDTO';
import { Product } from '@domain/entities/Product';
;
import { ICacheProvider } from '@domain/providers/Cache/ICacheProvider';
import { IProductRepository } from '@domain/repositories/IProductRepository';

export class IFetchProductsUseCase {
  constructor(
    private readonly iProductRepository: IProductRepository,
    private readonly iCacheProvider: ICacheProvider
  ) {}

  async execute({
    page,
  }: IFetchProductsDTO): Promise<
    FetchProductsResponse | ProductsNotFoundErrorResponse
  > {
    const cachedProducts: string | null = await this.iCacheProvider.get(
      `products-${page}`
    );

    if (cachedProducts) {
      const cachedProductsParsed: Product[] = JSON.parse(cachedProducts);
      return {
        products: cachedProductsParsed,
      };
    }

    const products: Product[] | null =
      await this.iProductRepository.fetchProducts({
        page,
      });

    if (!products) return new ProductsNotFoundErrorResponse();

    // products-${page}
    await this.iCacheProvider.set(`products-${page}`, JSON.stringify(products), {
      EX: 900,
    });

    console.log(products);
    return {
      products: products,
    };
  }
}
