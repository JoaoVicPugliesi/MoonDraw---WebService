import { ICacheService } from '@domain/services/ICacheService';
import { ISelectProductDTO } from './ISelectProductDTO';
import { Product } from '@domain/entities/Product';
import {
  ProductNotFoundErrorResponse,
  SelectProductResponse,
} from '@application/handlers/UseCasesResponses/Product/ISelectProductHandlers';
import { IProductRepository } from '@domain/repositories/IProductRepository';

export class ISelectProductUseCase {
  constructor(
    private readonly iProductRepository: IProductRepository,
    private readonly iCacheService: ICacheService
  ) {}

  async execute({
    public_id,
  }: ISelectProductDTO): Promise<
    SelectProductResponse | ProductNotFoundErrorResponse
  > {
    const cachedProduct: string | null = await this.iCacheService.get(
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

    await this.iCacheService.set(
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
