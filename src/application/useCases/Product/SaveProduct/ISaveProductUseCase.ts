import { IProductRepository } from '@domain/repositories/IProductRepository';
import { ISaveProductDTO } from './ISaveProductDTO';
import { Product } from '@domain/entities/Product';
import { ProductAlreadyExistsErrorResponse } from '@application/handlers/UseCasesResponses/Product/ISaveProductHandlers';

export class ISaveProductUseCase {
  constructor(
    private readonly iProductRepository: IProductRepository
  ) {}

  async execute({
    image_id,
    name,
    description,
    price,
    supply,
    publisher,
  }: ISaveProductDTO): Promise<ProductAlreadyExistsErrorResponse | void> {
    const product: Product | null = await this.iProductRepository.findProductByName({
      name
    });

    if(product) return new ProductAlreadyExistsErrorResponse();

    await this.iProductRepository.saveProduct({
        image_id, 
        name,
        description,
        price,
        supply,
        publisher
    });
  }
}
