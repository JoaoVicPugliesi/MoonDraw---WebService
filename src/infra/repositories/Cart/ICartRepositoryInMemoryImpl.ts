import { Cart } from '@domain/entities/Cart';
import { Product } from '@domain/entities/Product';
import { v4 as uuidv4 } from 'uuid';
import { IAssignCartOwnerDTO } from '@application/useCases/Сart/AssignCartOwner/IAssignCartOwnerDTO';
import { IListCartContentDTO } from '@application/useCases/Сart/ListCartContent/IListCartContentDTO';
import { ICartRepository } from '@domain/repositories/ICartRepository';
import { IAttachProductIntoCartDTO } from '@application/useCases/Сart/AttachProductIntoCart/IAttachProductIntoCartDTO';
import { IDetachProductFromCartDTO } from '@application/useCases/Сart/DetachProductFromCart/IDetachProductFromCartDTO';
import { IGetCartDTO } from '@application/useCases/Сart/GetCart/IGetCartDTO';

export class ICartRepositoryInMemoryImpl implements ICartRepository {
  constructor(
    private readonly carts: Cart[]
  ) {}

  async assignCartOwner({ public_id }: IAssignCartOwnerDTO): Promise<void> {
      const cart: Cart = {
        id: this.carts.length + 1,
        public_id: uuidv4(),
        owner_id: public_id,
      };
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

  async getCart({
    owner_id
  }: IGetCartDTO): Promise<Cart | null> {
      return new Promise((resolve, reject) => {
        const cart: Cart | undefined = this.carts.find((cart: Cart) => cart.owner_id === owner_id);

        if(typeof cart === 'undefined') return null;

        return cart;
      });
  }
}
