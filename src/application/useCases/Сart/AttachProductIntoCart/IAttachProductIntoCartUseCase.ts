import { ICartRepository } from '@domain/repositories/ICartRepository';
import { IAttachProductIntoCartDTO } from './IAttachProductIntoCartDTO';
import {
  IAttachProductIntoCartResponse,
  InvalidAttachmentAlreadyExistsErrorResponse,
} from '@application/handlers/UseCasesResponses/Cart/IAttachProductIntoCart';

export class IAttachProductIntoCartUseCase {
  constructor(private readonly iCartRepository: ICartRepository) {}

  async execute({
    cart_id,
    product_id,
  }: IAttachProductIntoCartDTO): Promise<
    | InvalidAttachmentAlreadyExistsErrorResponse
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

    return {
      success: true
    }
  }
}
