import { ISearchProductsDTO } from '@application/useCases/Product/SearchProducts/ISearchProductsDTO';
import { ISelectProductDTO } from '@application/useCases/Product/SelectProduct/ISelectProductDTO';
import { IFetchProductsDTO } from '@application/useCases/Product/FetchProducts/IFetchProductsDTO';
import { Product } from '@domain/entities/Product';
import { IProductRepository } from '@domain/repositories/IProductRepository';
import { IProductRepositoryPrismaImpl } from '@infra/repositories_implementation/Product/IProductRepositoryPrismaImpl';
import { ISaveProductDTO } from '@application/useCases/Product/SaveProduct/ISaveProductDTO';

class IProductDecorator implements IProductRepository {
  constructor(private readonly decoratee: IProductRepository) {}

  async fetchProducts({ page }: IFetchProductsDTO): Promise<Product[] | null> {
    return await this.decoratee.fetchProducts({
      page,
    });
  }
  async selectProduct({
    public_id,
  }: ISelectProductDTO): Promise<Product | null> {
    return await this.decoratee.selectProduct({
      public_id,
    });
  }
  async searchProducts({
    name,
  }: ISearchProductsDTO): Promise<Product[] | null> {
    return await this.decoratee.searchProducts({
      name,
    });
  }

  async saveProduct({
    image_id,
    name,
    description,
    price,
    supply,
    publisher,
  }: ISaveProductDTO): Promise<void> {
    await this.decoratee.saveProduct({
      image_id,
      name,
      description,
      price,
      supply,
      publisher,
    });
  }

  async findProductByName({
    name
  }: Pick<Product, 'name'>): Promise<Product | null> {
    return await this.decoratee.findProductByName({
      name
    });
  }
}

const decoratee = new IProductRepositoryPrismaImpl();
const iProductDecorator = new IProductDecorator(decoratee);

export { iProductDecorator };
