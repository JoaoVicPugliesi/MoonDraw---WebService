import { ISearchProductsDTO } from '@application/useCases/Product/SearchProducts/ISearchProductsDTO';
import { Product } from '@domain/entities/Product';
import { ISearchProductsRepo } from '@domain/repositories/Product/ISearchProductsRepo';
import { ISearchProductsRepoPrismaImpl } from '@infra/repositories_implementation/Product/SearchProducts/ISearchProductsRepoPrismaImpl';

export class ISearchProductsDecorator implements ISearchProductsRepo {
  constructor(
    private readonly decoratee: ISearchProductsRepo
  ) {}

  async searchProducts({
    name,
  }: ISearchProductsDTO): Promise<Product[] | undefined> {
    return await this.decoratee.searchProducts({
      name,
    });
  }
}

const decoratee = new ISearchProductsRepoPrismaImpl();
const iSearchProductsDecorator = new ISearchProductsDecorator(decoratee);

export { iSearchProductsDecorator };
