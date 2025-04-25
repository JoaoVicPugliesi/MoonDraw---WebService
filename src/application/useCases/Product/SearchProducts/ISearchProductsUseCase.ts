import { IProductRepository } from '@domain/repositories/IProductRepository';
import { ICacheService } from '@domain/services/ICacheService';
import { ISearchProductsDTO } from './ISearchProductsDTO';
import { Product } from '@domain/entities/Product';
import { SearchedProductsNotFoundErrorResponse, ISearchProductsResponse } from '@application/handlers/UseCasesResponses/Product/ISearchProductsHandlers';

export class ISearchProductsUseCase {
  constructor(
    private readonly iProductRepository: IProductRepository,
    private readonly iCacheService: ICacheService
  ) {}

  async execute({ 
    name 
  }: ISearchProductsDTO): Promise<ISearchProductsResponse | SearchedProductsNotFoundErrorResponse> {
    const cachedSearch: string | null = await this.iCacheService.get(
      `search-${name}`
    );

    if (cachedSearch) {
      const cachedSearchParsed: Product[] = JSON.parse(cachedSearch);
      return {
        result: cachedSearchParsed,
      };
    }

    const search: Product[] | null =
      await this.iProductRepository.searchProducts({
        name,
      });

    if (!search) return new SearchedProductsNotFoundErrorResponse();

    await this.iCacheService.set(`search-${name}`, JSON.stringify(search), {
      EX: 1800
    });

    return {
      result: search,
    };
  }
}
