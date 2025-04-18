import { ISearchProductsRepo } from '@domain/repositories/Product/ISearchProductsRepo';
import { ICacheService } from '@domain/services/ICacheService';
import { ISearchProductsDTO } from './ISearchProductsDTO';
import { Product } from '@domain/entities/Product';
import { InvalidSearchedProductsNotFoundErrorResponse, ISearchProductsResponse } from '@application/handlers/UseCasesResponses/Product/ISearchProductsHandlers';

export class ISearchProductsUseCase {
  constructor(
    private readonly iSearchProductsRepo: ISearchProductsRepo,
    private readonly iCacheService: ICacheService
  ) {}

  async execute({ name }: ISearchProductsDTO): Promise<ISearchProductsResponse | InvalidSearchedProductsNotFoundErrorResponse> {
    const cachedSearch: string | undefined = await this.iCacheService.get(
      `search-${name}`
    );

    if (typeof cachedSearch === 'string') {
      const cachedSearchParsed: Product[] = JSON.parse(cachedSearch);
      return {
        result: cachedSearchParsed,
      };
    }

    const search: Product[] | undefined =
      await this.iSearchProductsRepo.searchProducts({
        name,
      });

    if (typeof search === 'undefined') return new InvalidSearchedProductsNotFoundErrorResponse();

    await this.iCacheService.set(`search-${name}`, JSON.stringify(search), {
      EX: 1800
    });

    return {
      result: search,
    };
  }
}
