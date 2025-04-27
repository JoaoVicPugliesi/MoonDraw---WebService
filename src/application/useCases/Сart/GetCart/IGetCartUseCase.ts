import { ICartRepository } from '@domain/repositories/ICartRepository';
import { IGetCartDTO } from './IGetCartDTO';
import { Cart } from '@domain/entities/Cart';
import { CartNotFoundErrorResponse, IGetCartResponse } from '@application/handlers/UseCasesResponses/Cart/IGetCartHandlers';

export class IGetCartUseCase {
  constructor(
    private readonly iCartRepository: ICartRepository
  ) {}

  async execute({
    user_id
  }: IGetCartDTO): Promise<CartNotFoundErrorResponse | IGetCartResponse> {
    const cart: Cart | null = await this.iCartRepository.getCart({
        user_id
    });

    if(!cart) return new CartNotFoundErrorResponse();

    return {
        cart: cart
    }
  }
}
