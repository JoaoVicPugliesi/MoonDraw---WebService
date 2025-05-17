import { Product } from '@domain/entities/Product';
import { ISelectProductUseCase } from './ISelectProductUseCase';
import { ISelectProductFactoryInMemory } from '@application/factories/Product/SelectProduct/ISelectProductFactoryInMemory';
import {
  ISelectProductDTO,
  ISelectProductResponse,
  ProductNotFoundErrorResponse,
} from './ISelectProductDTO';


const products: Product[] = [];
const product: Product = {
  id: products.length + 1,
  public_id: '5bec2f9a4f5da14f143e4c6076b9b5ebb6ef30cd670e2f1b375f8e4125fade2a',
  artist_id: '',
  images_id: ['', ''],
  name: 'Air Jordan',
  description: 'No Description',
  price: 5.99,
  supply: 100,
  publisher: 'Nike',
  published_at: new Date(),
  updated_at: new Date()
}
const cache: Map<string, string> = new Map<string, string>();
describe('Should analyse every possible end related to selecting products', () => {
  it('Must not select a product because product was not found', async () => {
    // Arrange
    const iFactory = new ISelectProductFactoryInMemory(products, cache);
    const sut: ISelectProductUseCase = iFactory.compose();
    const { 
        public_id 
    }: ISelectProductDTO = {
      public_id: '5bec2f9a4f5da14f143e4c6076b9b5ebb6ef30cd670e2f1b375f8e4125fade2a',
    };
    // Act
    const response: ISelectProductResponse = await sut.execute({
      public_id,
    });
    // Assert
    expect(response).toBeInstanceOf(ProductNotFoundErrorResponse);
    expect(response).not.toHaveProperty('product');
  });
  it('Must select a product successfully', async () => {
    // Arrange
    products.push(product);
    const iFactory = new ISelectProductFactoryInMemory(products, cache);
    const sut: ISelectProductUseCase = iFactory.compose();
    const { 
        public_id 
    }: ISelectProductDTO = {
      public_id: '5bec2f9a4f5da14f143e4c6076b9b5ebb6ef30cd670e2f1b375f8e4125fade2a',
    };
    // Act
    const response: ISelectProductResponse = await sut.execute({
      public_id,
    });
    // Assert
    expect(response).not.toBeInstanceOf(ProductNotFoundErrorResponse);
    expect(response).toHaveProperty('product');
  });
});
