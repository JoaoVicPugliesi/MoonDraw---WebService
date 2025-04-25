import { IFetchProductsDTO } from './IFetchProductsDTO';
import { Product } from '@domain/entities/Product';
import {
  FetchProductsResponse,
  ProductsNotFoundErrorResponse,
} from '@application/handlers/UseCasesResponses/Product/IFetchProductsHandlers';
import { ICacheService } from '@domain/services/ICacheService';
import { IProductRepository } from '@domain/repositories/IProductRepository';

export class IFetchProductsUseCase {
  constructor(
    private readonly iProductRepository: IProductRepository,
    private readonly iCacheService: ICacheService
  ) {}

  async execute({
    page,
  }: IFetchProductsDTO): Promise<
    FetchProductsResponse | ProductsNotFoundErrorResponse
  > {
    const cachedProducts: string | null = await this.iCacheService.get(
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
    await this.iCacheService.set(`products-${page}`, JSON.stringify(products), {
      EX: 900,
    });

    return {
      products: products,
    };
  }
}
