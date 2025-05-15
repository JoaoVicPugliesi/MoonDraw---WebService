import { IDetachProductFromCartFactoryInMemory } from '@application/factories/Cart/DetachProductFromCart/IDetachProductFromCartFactoryInMemory';
import { Cart } from '@domain/entities/Cart';
import { Cart_Product_Pivot } from '@prisma/client';
import { IDetachProductFromCartUseCase } from './IDetachProductFromCartUseCase';
import {
  AttachmentDoesNotExistsErrorResponse,
  IDetachProductFromCartDTO,
  IDetachProductFromCartResponse,
} from './IDetachProductFromCartDTO';

const carts: Cart[] = [];
const cart: Cart = {
  id: carts.length + 1,
  public_id: '845948297cfb7d5d58ae8df42b2672527bc42c5bf7154be738f9c01b91af362f',
  owner_id: '73b79f6ec76bae4f5315d191b334c0dcafb2ecb4d285067ce8da067a23bd5f62',
};
carts.push(cart);
const pivot_carts_products: Cart_Product_Pivot[] = [];
const attachment: Cart_Product_Pivot = {
  cart_id: '845948297cfb7d5d58ae8df42b2672527bc42c5bf7154be738f9c01b91af362f',
  product_id:
    '73b79f6ec76bae4f5315d191b334c0dcafb2ecb4d285067ce8da067a23bd5f62',
};
describe('Should analyse every possible end related to detaching a product from a cart', () => {
  it('must detach product from cart successfully', async () => {
    // Arrange
    pivot_carts_products.push(attachment);
    const iFactory = new IDetachProductFromCartFactoryInMemory(
      carts,
      pivot_carts_products
    );
    const sut: IDetachProductFromCartUseCase = iFactory.compose();
    const { cart_id, product_id }: IDetachProductFromCartDTO = {
      cart_id:
        '845948297cfb7d5d58ae8df42b2672527bc42c5bf7154be738f9c01b91af362f',
      product_id:
        '73b79f6ec76bae4f5315d191b334c0dcafb2ecb4d285067ce8da067a23bd5f62',
    };
    // Act
    const response: IDetachProductFromCartResponse = await sut.execute({
      cart_id,
      product_id,
    });
    // Assert
    expect(response).not.toBeInstanceOf(AttachmentDoesNotExistsErrorResponse);
    expect(response).toHaveProperty('success');
  });
  it('must not detach product from a cart because attachment does not exist', async () => {
    // Arrange
    pivot_carts_products.shift()
    const iFactory = new IDetachProductFromCartFactoryInMemory(
      carts,
      pivot_carts_products
    );
    const sut: IDetachProductFromCartUseCase = iFactory.compose();
    const { 
        cart_id, 
        product_id 
    }: IDetachProductFromCartDTO = {
      cart_id:
        '845948297cfb7d5d58ae8df42b2672527bc42c5bf7154be738f9c01b91af362f',
      product_id:
        '73b79f6ec76bae4f5315d191b334c0dcafb2ecb4d285067ce8da067a23bd5f62',
    };
    // Act
    const response: IDetachProductFromCartResponse = await sut.execute({
      cart_id,
      product_id,
    });
    // Assert
    expect(response).toBeInstanceOf(AttachmentDoesNotExistsErrorResponse);
    expect(response).not.toHaveProperty('success');
  });
});
