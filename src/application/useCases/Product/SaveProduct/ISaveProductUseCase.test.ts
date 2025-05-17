import { ISaveProductFactoryInMemory } from '@application/factories/Product/SaveProduct/ISaveProductFactoryInMemory';
import { Product } from '@domain/entities/Product';
import { ISaveProductUseCase } from './ISaveProductUseCase';
import {
  ISaveProductDTO,
  ISaveProductResponse,
  ProductAlreadyExistsErrorResponse,
} from './ISaveProductDTO';

const products: Product[] = [];
describe('Should analyse every possible end related to saving products', () => {
  it('Must save a product successfully', async () => {
    // Arrange
    const iFactory = new ISaveProductFactoryInMemory(products);
    const sut: ISaveProductUseCase = iFactory.compose();
    const {
      images_id,
      artist_id,
      name,
      description,
      price,
      supply,
      publisher,
    }: ISaveProductDTO = {
      images_id: ['92466e707ed31f276d22a0320c042291d06eba86abc3c6a608375000eb8d0906'],
      artist_id: 'cdfb2d676c75031dae946be9e1de4e2e3cb888b68244fad0dfc22496dec6316b',
      name: 'Air Jordan',
      description: 'i Believe I Can Fly',
      price: 200,
      supply: 100,
      publisher: 'Nike',
    };
    // Act
    const response: ISaveProductResponse = await sut.execute({
      images_id,
      artist_id,
      name,
      description,
      price,
      supply,
      publisher,
    });
    // Assert
    expect(response).not.toBeInstanceOf(ProductAlreadyExistsErrorResponse);
    expect(response).toHaveProperty('success');
  });
  it('Must not save a product because product already exists', async () => {
    // Arrange
    const iFactory = new ISaveProductFactoryInMemory(products);
    const sut: ISaveProductUseCase = iFactory.compose();
    const {
      images_id,
      artist_id,
      name,
      description,
      price,
      supply,
      publisher,
    }: ISaveProductDTO = {
      images_id: ['92466e707ed31f276d22a0320c042291d06eba86abc3c6a608375000eb8d0906'],
      artist_id: 'cdfb2d676c75031dae946be9e1de4e2e3cb888b68244fad0dfc22496dec6316b',
      name: 'Air Jordan',
      description: 'i Believe I Can Fly',
      price: 200,
      supply: 100,
      publisher: 'Nike',
    };
    // Act
    const response: ISaveProductResponse = await sut.execute({
      images_id,
      artist_id,
      name,
      description,
      price,
      supply,
      publisher,
    });
    // Assert
    expect(response).toBeInstanceOf(ProductAlreadyExistsErrorResponse);
    expect(response).not.toHaveProperty('success');
  });
  
});
