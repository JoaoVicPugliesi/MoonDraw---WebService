import { IAssignCartOwnerDTO } from '@application/useCases/Сart/AssignCartOwner/IAssignCartOwnerDTO';
import { IAttachProductIntoCart } from '@application/useCases/Сart/AttachProductIntoCart/IAttachProductIntoCartDTO';
import { IListCartContentDTO } from '@application/useCases/Сart/ListCartContent/IListCartContentDTO';
import { Cart } from '@domain/entities/Cart';
import { Product } from '@domain/entities/Product';
import { ICartRepository } from '@domain/repositories/ICartRepository';
import { prisma } from '@infra/db/Prisma';
import { randomUUID } from 'crypto';

export class ICartRepositoryPrismaImpl implements ICartRepository {
  async assignCartOwner({ 
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

  async listCartContent({ 
    public_id 
  }: IListCartContentDTO): Promise<Product[] | null> {
      const content = await prisma.cart.findUnique({
        where: {
          public_id: public_id
        },
        include: {
          products: {
            include: {
              product: true
            }
          }
        }
      });
    
      if(!content) return null;
      
      return content.products.map(p => p.product);
  }

  async attachProductIntoCart({
    cart_id,
    product_id
  }: IAttachProductIntoCart): Promise<void> {
      await prisma.pivot_Cart_Product.create({
        data: {
          product_id: product_id,
          cart_id: cart_id
        }
      });
  }
}
