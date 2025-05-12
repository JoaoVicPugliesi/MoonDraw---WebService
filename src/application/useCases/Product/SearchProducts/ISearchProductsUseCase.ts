import { IProductRepository } from '@domain/repositories/IProductRepository';
import { ICacheProvider } from '@domain/providers/Cache/ICacheProvider';
import { ISearchProductsDTO, ISearchProductsResponse, SearchedProductsNotFoundErrorResponse } from './ISearchProductsDTO';
import { Product } from '@domain/entities/Product';

export class ISearchProductsUseCase {
  constructor(
    private readonly iProductRepository: IProductRepository,
    private readonly iCacheProvider: ICacheProvider
  ) {}

  async execute({ 
    name 
  }: ISearchProductsDTO): Promise<ISearchProductsResponse> {
    const cachedSearch: string | null = await this.iCacheProvider.get(
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

    await this.iCacheProvider.set(`search-${name}`, JSON.stringify(search), {
      EX: 1800
    });

    return {
      result: search,
    };
  }
}
