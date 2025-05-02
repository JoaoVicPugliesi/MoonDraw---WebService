import { ICartRepository } from '@domain/repositories/ICartRepository';
import { CartNotFoundErrorResponse, IGetCartDTO, IGetCartResponse } from './IGetCartDTO';
import { Cart } from '@domain/entities/Cart';

export class IGetCartUseCase {
  constructor(
    private readonly iCartRepository: ICartRepository
  ) {}

  async execute({
    owner_id
  }: IGetCartDTO): Promise<CartNotFoundErrorResponse | IGetCartResponse> {
    const cart: Cart | null = await this.iCartRepository.getCart({
        owner_id
    });

    if(!cart) return new CartNotFoundErrorResponse();

    return {
        cart: cart
    }
  }
}
