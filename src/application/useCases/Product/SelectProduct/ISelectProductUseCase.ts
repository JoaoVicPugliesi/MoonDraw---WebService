import { ISelectProductRepo } from '@domain/repositories/Product/ISelectProductRepo';
import { ICacheService } from '@domain/services/ICacheService';
import { ISelectProductDTO } from './ISelectProductDTO';
import { Product } from '@domain/entities/Product';
import {
  InvalidProductNotFoundErrorResponse,
  SelectProductResponse,
} from '@application/handlers/UseCasesResponses/Product/ISelectProductHandlers';

export class ISelectProductUseCase {
  constructor(
    private readonly iSelectProductRepo: ISelectProductRepo,
    private readonly iCacheService: ICacheService
  ) {}

  async execute({
    public_id,
  }: ISelectProductDTO): Promise<
    SelectProductResponse | InvalidProductNotFoundErrorResponse
  > {
    const cachedProduct: string | undefined = await this.iCacheService.get(
      `product-${public_id}`
    );

    if (typeof cachedProduct === 'string') {
      const cachedProductParsed: Product = JSON.parse(cachedProduct);
      return {
        product: cachedProductParsed,
      };
    }

    const product: Product | undefined =
      await this.iSelectProductRepo.selectOne({
        public_id,
      });

    if (typeof product === 'undefined') return new InvalidProductNotFoundErrorResponse();

    await this.iCacheService.set(
      `product-${public_id}`,
      JSON.stringify(product)
    );

    return {
      product: product,
    };
  }
}
