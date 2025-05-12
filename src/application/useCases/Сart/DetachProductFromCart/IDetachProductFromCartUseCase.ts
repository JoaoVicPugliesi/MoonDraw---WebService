import { ICartRepository } from '@domain/repositories/ICartRepository';
import { AttachmentDoesNotExistsErrorResponse, IDetachProductFromCartDTO, IDetachProductFromCartResponse } from './IDetachProductFromCartDTO';


export class IDetachProductFromCartUseCase {
  constructor(
    private readonly iCartRepository: ICartRepository
  ) {}

  async execute({
    cart_id,
    product_id,
  }: IDetachProductFromCartDTO): Promise<IDetachProductFromCartResponse> {
    const attachment: boolean =
      await this.iCartRepository.findAttachmentBetweenProductAndCart({
        cart_id,
        product_id,
      });

    if (!attachment) return new AttachmentDoesNotExistsErrorResponse();

    await this.iCartRepository.detachProductFromCart({
      cart_id,
      product_id,
    });

    return  {
        success: true
    }
  }
}
