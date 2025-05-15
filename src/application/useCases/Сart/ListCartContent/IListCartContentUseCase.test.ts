import { IListCarContentFactoryInMemory } from '@application/factories/Cart/ListCartContent/IListCartContentFactoryInMemory';
import { Cart } from '@domain/entities/Cart';
import { IListCartContentUseCase } from './IListCartContentUseCase';
import {
  CartEmptyErrorResponse,
  IListCartContentDTO,
  IListCartContentResponse,
} from './IListCartContentDTO';
import { Cart_Product_Pivot } from '@prisma/client';
import { Product } from '@domain/entities/Product';

const carts: Cart[] = [];
const products: Product[] = [];
const pivot_carts_products: Cart_Product_Pivot[] = [];
const cart: Cart = {
  id: 0,
  public_id: '',
  owner_id: ''
}
const product: Product = {
  id: products.length + 1,
  public_id: '',
  images_id: [''],
  artist_id: '',
  name: '',
  description: '',
  price: 0,
  supply: 0,
  publisher: '',
  published_at: new Date(),
  updated_at: new Date()
}
const attachment: Cart_Product_Pivot = {
  cart_id: cart.public_id,
  product_id: product.public_id
}
carts.push(cart);
products.push(product);
pivot_carts_products.push(attachment);
describe('Should analyse every possible end related to listing cart content', () => {
  it('Must list cart content successfully', async () => {
    // Arrange
    const iFactory = new IListCarContentFactoryInMemory(carts, pivot_carts_products, products);
    const sut: IListCartContentUseCase = iFactory.compose();
    const { public_id }: IListCartContentDTO = {
      public_id: '',
    };
    // Act
    const response: IListCartContentResponse = await sut.execute({
      public_id,
    });
    // Assert
    expect(response).not.toBeInstanceOf(CartEmptyErrorResponse);
    expect(response).toHaveProperty('content');
  });
  it('Must not list cart content because cart is empty', async () => {
    // Arrange
    const iFactory = new IListCarContentFactoryInMemory(carts, pivot_carts_products.toSpliced(0), products);
    const sut: IListCartContentUseCase = iFactory.compose();
    const { 
      public_id 
    }: IListCartContentDTO = {
      public_id: '',
    };
    // Act
    const response: IListCartContentResponse = await sut.execute({
      public_id,
    });
    // Assert
    expect(response).toBeInstanceOf(CartEmptyErrorResponse);
    expect(response).not.toHaveProperty('content');
  });
});
