import { IAssignCartOwnerDTO } from '@application/useCases/Сart/AssignCartOwner/IAssignCartOwnerDTO';
import { Cart } from '@domain/entities/Cart';
import { ICartRepository } from '@domain/repositories/ICartRepository';
import { randomUUID } from 'crypto';

export class ICartRepositoryInMemoryImpl implements ICartRepository {
  constructor(
    private readonly carts: Cart[]
  ) {}

  async assignCart({ 
    public_id 
  }: IAssignCartOwnerDTO): Promise<Cart> {
    return new Promise((resolve, reject) => {
      const cart: Cart = {
        id: this.carts.length + 1,
        public_id: randomUUID(),
        user_id: public_id,
      };

      this.carts.push(cart);

      return cart;
    });
  }
}
