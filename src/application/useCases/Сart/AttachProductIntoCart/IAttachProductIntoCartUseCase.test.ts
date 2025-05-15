import { IAttachProductIntoCartFactoryInMemory } from '@application/factories/Cart/AttachProductIntoCart/IAttachProductIntoCartFactoryInMemory';
import { Cart } from '@domain/entities/Cart';
import { Cart_Product_Pivot } from '@prisma/client';
import { IAttachProductIntoCartUseCase } from './IAttachProductIntoCartUseCase';
import {
  AttachmentAlreadyExistsErrorResponse,
  IAttachProductIntoCartDTO,
  IAttachProductIntoCartResponse,
} from './IAttachProductIntoCartDTO';

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
describe('Should analyse every possible end related to attaching a product into a cart', () => {
  it('must attach product into cart successfully', async () => {
    // Arrange
    const iFactory = new IAttachProductIntoCartFactoryInMemory(
      carts,
      pivot_carts_products
    );
    const sut: IAttachProductIntoCartUseCase = iFactory.compose();
    const { cart_id, product_id }: IAttachProductIntoCartDTO = {
      cart_id:
        '845948297cfb7d5d58ae8df42b2672527bc42c5bf7154be738f9c01b91af362f',
      product_id:
        '73b79f6ec76bae4f5315d191b334c0dcafb2ecb4d285067ce8da067a23bd5f62',
    };
    // Act
    const response: IAttachProductIntoCartResponse = await sut.execute({
      cart_id,
      product_id,
    });
    // Assert
    expect(response).not.toBeInstanceOf(AttachmentAlreadyExistsErrorResponse);
    expect(response).toHaveProperty('success');
  });
  it('must not attach product into cart because attachment already exists', async () => {
    // Arrange
    const iFactory = new IAttachProductIntoCartFactoryInMemory(
      carts,
      pivot_carts_products
    );
    const sut: IAttachProductIntoCartUseCase = iFactory.compose();
    const { cart_id, product_id }: IAttachProductIntoCartDTO = {
      cart_id:
        '845948297cfb7d5d58ae8df42b2672527bc42c5bf7154be738f9c01b91af362f',
      product_id:
        '73b79f6ec76bae4f5315d191b334c0dcafb2ecb4d285067ce8da067a23bd5f62',
    };
    // Act
    const response: IAttachProductIntoCartResponse = await sut.execute({
      cart_id,
      product_id,
    });
    // Assert
    expect(response).toBeInstanceOf(AttachmentAlreadyExistsErrorResponse);
    expect(response).not.toHaveProperty('success');
  });
});
