import { ICacheServiceInMemoryImpl } from './../../../../infra/services_implementation/CacheService/ICacheServiceInMemoryImpl';
import { ISelectProductsUseCase } from '@application/useCases/Product/SelectProducts/ISelectProductsUseCase';
import { Product } from '@domain/entities/Product';
import { ISelectProductsRepoInMemoryImpl } from '@infra/repositories_implementation/Product/SelectProducts/ISelectProductsRepoInMemoryImpl';

export class ISelectProductsInMemoryFactory {
  constructor(
    private readonly products: Product[],
    private readonly cache: Map<string, string>
  ) {}

  compose(): ISelectProductsUseCase {
    const iSelectProductsRepoInMemoryImpl = new ISelectProductsRepoInMemoryImpl(
      this.products
    );
    const iCacheServiceInMemoryImpl = new ICacheServiceInMemoryImpl(this.cache);

    return new ISelectProductsUseCase(
      iSelectProductsRepoInMemoryImpl,
      iCacheServiceInMemoryImpl
    );
  }
}
