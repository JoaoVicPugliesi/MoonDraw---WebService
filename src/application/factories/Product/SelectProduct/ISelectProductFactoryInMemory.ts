import { Product } from '@domain/entities/Product';
import { ISelectProductUseCase } from '@application/useCases/Product/SelectProduct/ISelectProductUseCase';
import { ICacheProviderInMemoryImpl } from '@infra/providers/Cache/ICacheProviderInMemoryImpl';
import { IProductRepositoryInMemoryImpl } from '@infra/repositories/Product/IProductRepositoryInMemoryImpl';

export class ISelectProductFactoryInMemory {
  constructor(
    private readonly products: Product[],
    private readonly cache: Map<string, string>
  ) {}
  compose(): ISelectProductUseCase {
    const iProductRepository = new IProductRepositoryInMemoryImpl(this.products);
    const iCacheProvider = new ICacheProviderInMemoryImpl(this.cache)
    return new ISelectProductUseCase(iProductRepository, iCacheProvider);
  }
}
