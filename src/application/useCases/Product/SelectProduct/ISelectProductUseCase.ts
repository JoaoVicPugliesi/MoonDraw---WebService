import { ICacheProvider } from '@domain/providers/Cache/ICacheProvider';
import { ISelectProductDTO, ISelectProductResponse, ProductNotFoundErrorResponse } from './ISelectProductDTO';
import { Product } from '@domain/entities/Product';
import { IProductRepository } from '@domain/repositories/IProductRepository';

export class ISelectProductUseCase {
  constructor(
    private readonly iProductRepository: IProductRepository,
    private readonly iCacheProvider: ICacheProvider
  ) {}

  async execute({
    public_id,
  }: ISelectProductDTO): Promise<ISelectProductResponse> {
    const cachedProduct: string | null = await this.iCacheProvider.get(
      `product-${public_id}`
    );

    if (cachedProduct) {
      const cachedProductParsed: Product = JSON.parse(cachedProduct);
      return {
        product: cachedProductParsed,
      };
    }

    const product: Product | null =
      await this.iProductRepository.selectProduct({
        public_id,
      });

    if (!product) return new ProductNotFoundErrorResponse();

    await this.iCacheProvider.set(
      `product-${public_id}`,
      JSON.stringify(product),
      {
        EX: 1800
      }
    );

    return {
      product: product,
    };
  }
}
