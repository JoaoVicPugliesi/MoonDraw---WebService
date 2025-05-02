import { prisma } from '@infra/db/Prisma';
import { Cart } from '@domain/entities/Cart';
import { Product } from '@domain/entities/Product';
import { v4 as uuidv4 } from 'uuid';
import { ICartRepository } from '@domain/repositories/ICartRepository';
import { IAssignCartOwnerDTO } from '@application/useCases/Сart/AssignCartOwner/IAssignCartOwnerDTO';
import { IAttachProductIntoCartDTO } from '@application/useCases/Сart/AttachProductIntoCart/IAttachProductIntoCartDTO';
import { IDetachProductFromCartDTO } from '@application/useCases/Сart/DetachProductFromCart/IDetachProductFromCartDTO';
import { IListCartContentDTO } from '@application/useCases/Сart/ListCartContent/IListCartContentDTO';
import { IGetCartDTO } from '@application/useCases/Сart/GetCart/IGetCartDTO';

export class ICartRepositoryPrismaImpl implements ICartRepository {
  async assignCartOwner({ 
    public_id 
  }: IAssignCartOwnerDTO): Promise<void> {
    await prisma.cart.create({
      data: {
        public_id: uuidv4(),
        owner_id: public_id,
      },
    });
  }

  async listCartContent({
    public_id,
  }: IListCartContentDTO): Promise<Product[] | null> {
    const content = await prisma.cart.findUnique({
      where: {
        public_id: public_id,
      },
      include: {
        products: {
          include: {
            product: true,
          },
        },
      },
    });

    if (!content) return null;

    return content.products.map((p) => p.product);
  }

  async attachProductIntoCart({
    cart_id,
    product_id,
  }: IAttachProductIntoCartDTO): Promise<void> {
    await prisma.cart_Product_Pivot.create({
      data: {
        cart_id: cart_id,
        product_id: product_id,
      },
    });
  }

  async findAttachmentBetweenProductAndCart({
    cart_id,
    product_id,
  }: IAttachProductIntoCartDTO): Promise<boolean> {
    const attachment = await prisma.cart_Product_Pivot.findFirst({
      where: {
        cart_id: cart_id,
        product_id: product_id,
      },
    });

    if (!attachment) return false;

    return true;
  }

  async detachProductFromCart({
    cart_id,
    product_id,
  }: IDetachProductFromCartDTO): Promise<void> {
    await prisma.cart_Product_Pivot.delete({
      where: {
       cart_id_product_id: {
        cart_id,
        product_id
       }
      },
    });
  }

  async getCart({
    owner_id
  }: IGetCartDTO): Promise<Cart | null> {
      const cart: Cart | null = await prisma.cart.findUnique({
        where: {
          owner_id: owner_id
        }
      });

      return cart;
  }
}
