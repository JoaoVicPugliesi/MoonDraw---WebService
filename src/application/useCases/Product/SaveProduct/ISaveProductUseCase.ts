import { IProductRepository } from '@domain/repositories/IProductRepository';
import {
  ISaveProductDTO,
  ISaveProductResponse,
  ProductAlreadyExistsErrorResponse,
} from './ISaveProductDTO';
import { Product } from '@domain/entities/Product';

export class ISaveProductUseCase {
  constructor(private readonly iProductRepository: IProductRepository) {}

  async execute({
    images_id,
    artist_id,
    name,
    description,
    price,
    supply,
    publisher,
  }: ISaveProductDTO): Promise<ISaveProductResponse> {
    const product: Product | null =
      await this.iProductRepository.findProductByName({
        name,
      });

    if (product) return new ProductAlreadyExistsErrorResponse();

    await this.iProductRepository.saveProduct({
      images_id,
      artist_id,
      name,
      description,
      price,
      supply,
      publisher,
    });

    return {
      success: true
    }
  }
}
