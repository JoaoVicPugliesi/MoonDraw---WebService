import { Cart } from "@domain/entities/Cart";
import { Product } from "@domain/entities/Product";
import { v4 as uuidv4 } from "uuid";
import { IAssignCartOwnerDTO } from "@application/useCases/Сart/AssignCartOwner/IAssignCartOwnerDTO";
import { IListCartContentDTO } from "@application/useCases/Сart/ListCartContent/IListCartContentDTO";
import { ICartRepository } from "@domain/repositories/ICartRepository";
import { IAttachProductIntoCartDTO } from "@application/useCases/Сart/AttachProductIntoCart/IAttachProductIntoCartDTO";
import { IDetachProductFromCartDTO } from "@application/useCases/Сart/DetachProductFromCart/IDetachProductFromCartDTO";
import { IGetCartDTO } from "@application/useCases/Сart/GetCart/IGetCartDTO";
import { Cart_Product_Pivot } from "@prisma/client";

export class ICartRepositoryInMemoryImpl implements ICartRepository {
  constructor(
    private readonly carts: Cart[],
    private pivot_carts_products?: Cart_Product_Pivot[],
    private readonly products?: Product[]
  ) {}

  async assignCartOwner({ public_id }: IAssignCartOwnerDTO): Promise<void> {
    const cart: Cart = {
      id: this.carts.length + 1,
      public_id: uuidv4(),
      owner_id: public_id,
    };

    this.carts.push(cart);
  }

  async listCartContent({
    public_id,
  }: IListCartContentDTO): Promise<Product[] | null> {
    return new Promise((resolve, reject) => {
      if (!this.pivot_carts_products) return resolve(null);
      if (!this.products) return resolve(null);
      const productIds: string[] = [];
      const products: Product[] = [];
      for (const i of this.pivot_carts_products) {
        const current = i;
        if (current.cart_id === public_id) {
          productIds.push(current.product_id);
        }
      }
      if(!productIds.length) return resolve(null);
      for(const i of this.products) {
        products.push(i);
      }

      return resolve(products);
    });
  }

  async attachProductIntoCart({
    cart_id,
    product_id,
  }: IAttachProductIntoCartDTO): Promise<void> {
    return new Promise((resolve, reject) => {
      this.pivot_carts_products?.push({
        cart_id,
        product_id,
      });

      resolve();
    });
  }

  async findAttachmentBetweenProductAndCart({
    cart_id,
    product_id,
  }: IAttachProductIntoCartDTO): Promise<boolean> {
    return new Promise((resolve) => {
      const attachment: Cart_Product_Pivot | undefined =
        this.pivot_carts_products?.find(
          (a) => a.cart_id === cart_id && a.product_id === product_id
        );
      if (attachment) return resolve(true);

      return resolve(false);
    });
  }

  async detachProductFromCart({
    cart_id,
    product_id,
  }: IDetachProductFromCartDTO): Promise<void> {
    return new Promise((resolve, reject) => {
      const pivotCartsProductsFiltered: Cart_Product_Pivot[] | undefined =
        this.pivot_carts_products?.filter(
          (a) => a.cart_id !== cart_id && a.product_id !== product_id
        );

      this.pivot_carts_products = pivotCartsProductsFiltered ?? [];

      resolve();
    });
  }

  async getCart({ owner_id }: IGetCartDTO): Promise<Cart | null> {
    return new Promise((resolve, reject) => {
      const cart: Cart | undefined = this.carts.find(
        (c: Cart) => c.owner_id === owner_id
      );

      if (!cart) return resolve(null);

      return resolve(cart);
    });
  }
}
