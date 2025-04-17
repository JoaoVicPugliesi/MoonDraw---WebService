import { ISelectProductsDTO } from '@application/useCases/Product/SelectProducts/ISelectProductsDTO';
import { Product } from '@domain/entities/Product';
import { ISelectProductsRepo } from '@domain/repositories/Product/ISelectProductsRepo';

export class ISelectProductsRepoInMemoryImpl implements ISelectProductsRepo {
  constructor(
    private readonly products: Product[]
  ) {}

  async selectProducts({
    page,
  }: ISelectProductsDTO): Promise<Product[] | null> {
    return new Promise((resolve, reject) => {
      const pageSize: number = 10;
      const productsSpliced: Product[] = this.products.slice(
        pageSize * (page - 1),
        pageSize * page
      );

      if(productsSpliced.length <= 0) return resolve(null);

      return resolve(productsSpliced);
    });
  }
}
