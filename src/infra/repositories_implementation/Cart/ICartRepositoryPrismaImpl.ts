import { IAssignCartOwnerDTO } from '@application/useCases/Сart/AssignCartOwner/IAssignCartOwnerDTO';
import { Cart } from '@domain/entities/Cart';
import { ICartRepository } from '@domain/repositories/ICartRepository';
import { prisma } from '@infra/db/Prisma';
import { randomUUID } from 'crypto';

export class ICartRepositoryPrismaImpl implements ICartRepository {
  async assignCart({ 
    public_id 
  }: IAssignCartOwnerDTO): Promise<Cart> {
    const cart: Cart = await prisma.cart.create({
      data: {
        public_id: randomUUID(),
        user_id: public_id,
      },
    });

    return cart;
  }
}
