import { ICartRepository } from '@domain/repositories/ICartRepository';
import { IAttachProductIntoCartDTO } from './IAttachProductIntoCartDTO';
import { Product } from '@domain/entities/Product';
import {
  IAttachProductIntoCartResponse,
  InvalidAttachmentAlreadyExistsErrorResponse,
  InvalidCartEmptyErrorResponse,
} from '@application/handlers/UseCasesResponses/Cart/IAttachProductIntoCart';

export class IAttachProductIntoCartUseCase {
  constructor(private readonly iCartRepository: ICartRepository) {}

  async execute({
    cart_id,
    product_id,
  }: IAttachProductIntoCartDTO): Promise<
    | InvalidAttachmentAlreadyExistsErrorResponse
    | InvalidCartEmptyErrorResponse
    | IAttachProductIntoCartResponse
  > {
    const attachment: boolean =
      await this.iCartRepository.findAttachmentBetweenProductAndCart({
        cart_id,
        product_id,
      });

    if (attachment) return new InvalidAttachmentAlreadyExistsErrorResponse();

    await this.iCartRepository.attachProductIntoCart({
      cart_id,
      product_id,
    });

    const content: Product[] | null =
      await this.iCartRepository.listCartContent({
        public_id: cart_id,
      });

    if (!content) return new InvalidCartEmptyErrorResponse();

    return {
      content: content,
    };
  }
}
