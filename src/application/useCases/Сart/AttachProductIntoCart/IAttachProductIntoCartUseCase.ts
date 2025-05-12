import { ICartRepository } from '@domain/repositories/ICartRepository';
import {
  AttachmentAlreadyExistsErrorResponse,
  IAttachProductIntoCartDTO,
  IAttachProductIntoCartResponse,
} from './IAttachProductIntoCartDTO';

export class IAttachProductIntoCartUseCase {
  constructor(private readonly iCartRepository: ICartRepository) {}

  async execute({
    cart_id,
    product_id,
  }: IAttachProductIntoCartDTO): Promise<IAttachProductIntoCartResponse> {
    const attachment: boolean =
      await this.iCartRepository.findAttachmentBetweenProductAndCart({
        cart_id,
        product_id,
      });

    if (attachment) return new AttachmentAlreadyExistsErrorResponse();

    await this.iCartRepository.attachProductIntoCart({
      cart_id,
      product_id,
    });

    return {
      success: true,
    };
  }
}
