import { IFetchProductsDTO } from './IFetchProductsDTO';
import { Product } from '@domain/entities/Product';
import {
  FetchProductsResponse,
  InvalidProductsNotFoundErrorResponse,
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
    FetchProductsResponse | InvalidProductsNotFoundErrorResponse
  > {
    const cachedProducts: string | undefined = await this.iCacheService.get(
      `products-${page}`
    );

    if (typeof cachedProducts === 'string') {
      const cachedProductsParsed: Product[] = JSON.parse(cachedProducts);
      return {
        products: cachedProductsParsed,
      };
    }

    const products: Product[] | null =
      await this.iProductRepository.fetchProducts({
        page,
      });

    if (!products) return new InvalidProductsNotFoundErrorResponse();

    // products-${page}
    await this.iCacheService.set(`products-${page}`, JSON.stringify(products), {
      EX: 900,
    });

    return {
      products: products,
    };
  }
}
