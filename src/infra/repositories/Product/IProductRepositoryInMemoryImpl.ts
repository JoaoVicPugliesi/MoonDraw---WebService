import { ISearchProductsDTO } from '@application/useCases/Product/SearchProducts/ISearchProductsDTO';
import { ISelectProductDTO } from '@application/useCases/Product/SelectProduct/ISelectProductDTO';
import { IFetchProductsDTO } from '@application/useCases/Product/FetchProducts/IFetchProductsDTO';
import { Product } from '@domain/entities/Product';
import { IProductRepository } from '@domain/repositories/IProductRepository';
import { ISaveProductDTO } from '@application/useCases/Product/SaveProduct/ISaveProductDTO';
import { v4 as uuidv4 } from 'uuid';

export class IProductRepositoryInMemoryImpl implements IProductRepository {
  constructor(private readonly products: Product[]) {}

  async fetchProducts({ 
    page 
  }: IFetchProductsDTO): Promise<Product[] | null> {
    return new Promise((resolve, reject) => {
      const pageSize: number = 10;
      const productsSpliced: Product[] = this.products.slice(
        pageSize * (page - 1),
        pageSize * page
      );

      if (productsSpliced.length <= 0) return resolve(null);

      return resolve(productsSpliced);
    });
  }

  async selectProduct({
    public_id,
  }: ISelectProductDTO): Promise<Product | null> {
    return new Promise((resolve, reject) => {
      const product: Product | undefined = this.products.find(
        (p: Product) => p.public_id === public_id
      );

      if (typeof product === 'undefined') {
        return resolve(null);
      }

      return resolve(product);
    });
  }

  async searchProducts({
    name,
  }: ISearchProductsDTO): Promise<Product[] | null> {
    return new Promise((resolve, reject) => {
      const products: Product[] | undefined = this.products.filter(
        (p: Product) => p.name.startsWith(name)
      );

      if (products.length <= 0) return resolve(null);

      return resolve(products);
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
    return new Promise((resolve, reject) => {
      const product: Product = {
        id: this.products.length + 1,
        public_id: uuidv4(),
        image_id: image_id,
        name: name,
        description: description,
        price: price,
        supply: supply,
        publisher: publisher,
        published_at: new Date(),
        updated_at: new Date()
      };
      this.products.push(product);

      resolve();
    });
  }

  async findProductByName({
    name
  }: Pick<Product, 'name'>): Promise<Product | null> {
    return new Promise((resolve, reject) => {
      const product: Product | undefined = this.products.find(
        (p: Product) => p.name === name
      );

      if (typeof product === 'undefined') {
        return resolve(null);
      }

      return resolve(product);
    });
  }
}
