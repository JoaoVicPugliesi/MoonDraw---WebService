import { IGetCartFactoryInMemory } from '@application/factories/Cart/GetCart/IGetCarFactoryInMemory';
import { Cart } from '@domain/entities/Cart';
import { IGetCartUseCase } from './IGetCartUseCase';
import {
  CartNotFoundErrorResponse,
  IGetCartDTO,
  IGetCartResponse,
} from './IGetCartDTO';

const carts: Cart[] = [];
const cart: Cart = {
  id: carts.length + 1,
  public_id: 'b79e4fc3e24100c0cc5c8b50fd0c38b4f9e297f1b9de8900c1d00c9defdd562c',
  owner_id: 'c34cd6b5029633ddb1382b6f5dcc2edc78d3ebdb5b1b25db9e0793109b30efc7',
};
describe('Should analyse every possible end related to getting a car', () => {
  it('Must get cart successfully', async () => {
    // Arrange
    carts.push(cart);
    const iFactory = new IGetCartFactoryInMemory(carts);
    const sut: IGetCartUseCase = iFactory.compose();
    const { owner_id }: IGetCartDTO = {
      owner_id:
        'c34cd6b5029633ddb1382b6f5dcc2edc78d3ebdb5b1b25db9e0793109b30efc7',
    };
    // Act
    const response: IGetCartResponse = await sut.execute({
      owner_id,
    });
    // Assert
    expect(response).not.toBeInstanceOf(CartNotFoundErrorResponse);
    expect(response).toHaveProperty('cart');
  });
  it('Must not get cart because cart does not exist', async () => {
    // Arrange
    carts.shift();
    const iFactory = new IGetCartFactoryInMemory(carts);
    const sut: IGetCartUseCase = iFactory.compose();
    const { owner_id }: IGetCartDTO = {
      owner_id:
        'c34cd6b5029633ddb1382b6f5dcc2edc78d3ebdb5b1b25db9e0793109b30efc7',
    };
    // Act
    const response: IGetCartResponse = await sut.execute({
      owner_id,
    });
    // Assert
    expect(response).toBeInstanceOf(CartNotFoundErrorResponse);
    expect(response).not.toHaveProperty('cart');
  });
});
