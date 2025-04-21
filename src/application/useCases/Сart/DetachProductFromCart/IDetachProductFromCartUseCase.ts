import { ICartRepository } from '@domain/repositories/ICartRepository';
import { IDetachProductFromCartDTO } from './IDetachProductFromCartDTO';
import {
  IDetachProductFromCartResponse,
  InvalidAttachmentDoesNotExistsErrorResponse,
} from '@application/handlers/UseCasesResponses/Cart/IDetachProductFromCartHandlers';

export class IDetachProductFromCartUseCase {
  constructor(
    private readonly iCartRepository: ICartRepository
  ) {}

  async execute({
    cart_id,
    product_id,
  }: IDetachProductFromCartDTO): Promise<
    | InvalidAttachmentDoesNotExistsErrorResponse 
    | IDetachProductFromCartResponse
  > {
    const attachment: boolean =
      await this.iCartRepository.findAttachmentBetweenProductAndCart({
        cart_id,
        product_id,
      });

    if (!attachment) return new InvalidAttachmentDoesNotExistsErrorResponse();

    await this.iCartRepository.detachProductFromCart({
      cart_id,
      product_id,
    });

    return  {
        success: true
    }
  }
}
