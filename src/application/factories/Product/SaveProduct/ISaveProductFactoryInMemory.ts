import { Product } from '@domain/entities/Product';
import { ISaveProductUseCase } from '@application/useCases/Product/SaveProduct/ISaveProductUseCase';
import { IProductRepositoryInMemoryImpl } from '@infra/repositories/Product/IProductRepositoryInMemoryImpl';

export class ISaveProductFactoryInMemory {
  constructor(private readonly products: Product[]) {}
  compose(): ISaveProductUseCase {
    const iProductRepository = new IProductRepositoryInMemoryImpl(
      this.products
    );
    return new ISaveProductUseCase(iProductRepository);
  }
}
