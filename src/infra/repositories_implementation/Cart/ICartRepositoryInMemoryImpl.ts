import { Cart } from '@domain/entities/Cart';
import { Product } from '@domain/entities/Product';
import { randomUUID } from 'crypto';
import { IAssignCartOwnerDTO } from '@application/useCases/Сart/AssignCartOwner/IAssignCartOwnerDTO';
import { IListCartContentDTO } from '@application/useCases/Сart/ListCartContent/IListCartContentDTO';
import { ICartRepository } from '@domain/repositories/ICartRepository';
import { IAttachProductIntoCartDTO } from '@application/useCases/Сart/AttachProductIntoCart/IAttachProductIntoCartDTO';
import { IDetachProductFromCartDTO } from '@application/useCases/Сart/DetachProductFromCart/IDetachProductFromCartDTO';

export class ICartRepositoryInMemoryImpl implements ICartRepository {
  constructor(private readonly carts: Cart[]) {}

  async assignCartOwner({ public_id }: IAssignCartOwnerDTO): Promise<Cart> {
    return new Promise((resolve, reject) => {
      const cart: Cart = {
        id: this.carts.length + 1,
        public_id: randomUUID(),
        user_id: public_id,
      };

      this.carts.push(cart);

      return resolve(cart);
    });
  }

  async listCartContent({
    public_id,
  }: IListCartContentDTO): Promise<Product[] | null> {
    const products: Product[] | null = [];

    return products;
  }

  async attachProductIntoCart({
    cart_id,
    product_id,
  }: IAttachProductIntoCartDTO): Promise<void> {
    return new Promise((resolve, reject) => {});
  }

  async findAttachmentBetweenProductAndCart({
    cart_id,
    product_id,
  }: IAttachProductIntoCartDTO): Promise<boolean> {
    return true;
  }

  async detachProductFromCart({
    cart_id,
    product_id,
  }: IDetachProductFromCartDTO): Promise<void> {
    return new Promise((resolve, reject) => {});
  }
}
