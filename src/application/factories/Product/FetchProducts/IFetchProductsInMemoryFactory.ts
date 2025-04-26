import { ICacheProviderInMemoryImpl } from '@infra/providers_implementation/Cache/ICacheProviderInMemoryImpl';
import { IFetchProductsUseCase } from '@application/useCases/Product/FetchProducts/IFetchProductsUseCase';
import { Product } from '@domain/entities/Product';
import { IProductRepositoryInMemoryImpl } from '@infra/repositories_implementation/Product/IProductRepositoryInMemoryImpl';

export class IFetchProductsInMemoryFactory {
  constructor(
    private readonly products: Product[],
    private readonly cache: Map<string, string>
  ) {}

  compose(): IFetchProductsUseCase {
    const iProductRepositoryInMemoryImpl = new IProductRepositoryInMemoryImpl(
      this.products
    );
    const iCacheProviderInMemoryImpl = new ICacheProviderInMemoryImpl(this.cache);

    return new IFetchProductsUseCase(
      iProductRepositoryInMemoryImpl,
      iCacheProviderInMemoryImpl
    );
  }
}
