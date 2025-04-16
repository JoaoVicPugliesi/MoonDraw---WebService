import { ISelectProductsRepo } from '@domain/repositories/Product/ISelectProductsRepo';
import { ISelectProductsDTO } from './ISelectProductsDTO';
import { Product } from '@domain/entities/Product';
import {
  SelectProductsResponse,
  InvalidProductsNotFoundErrorResponse,
} from '@application/handlers/UseCasesResponses/Product/ISelectProductsHandlers';
import { ICacheService } from '@domain/services/ICacheService';

export class ISelectProductsUseCase {
  constructor(
    private readonly iSelectProductsRepo: ISelectProductsRepo,
    private readonly iCacheService: ICacheService
  ) {}

  async execute({
    page,
  }: ISelectProductsDTO): Promise<
    SelectProductsResponse | InvalidProductsNotFoundErrorResponse
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
      await this.iSelectProductsRepo.selectProducts({
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
