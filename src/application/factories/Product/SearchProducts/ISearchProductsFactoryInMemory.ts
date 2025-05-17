import { Product } from '@domain/entities/Product';
import { ISearchProductsUseCase } from '@application/useCases/Product/SearchProducts/ISearchProductsUseCase';
import { ICacheProviderInMemoryImpl } from '@infra/providers/Cache/ICacheProviderInMemoryImpl';
import { IProductRepositoryInMemoryImpl } from '@infra/repositories/Product/IProductRepositoryInMemoryImpl';

export class ISearchProductsFactoryInMemory {
  constructor(
    private readonly products: Product[],
    private readonly cache: Map<string, string>
  ) {}
  compose(): ISearchProductsUseCase {
    const iProductRepository = new IProductRepositoryInMemoryImpl(
      this.products
    );
    const iCacheProvider = new ICacheProviderInMemoryImpl(this.cache);
    return new ISearchProductsUseCase(iProductRepository, iCacheProvider);
  }
}
