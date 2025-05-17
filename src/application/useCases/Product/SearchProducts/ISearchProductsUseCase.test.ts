import { ISearchProductsFactoryInMemory } from '@application/factories/Product/SearchProducts/ISearchProductsFactoryInMemory';
import { Product } from '@domain/entities/Product';
import { ISearchProductsUseCase } from './ISearchProductsUseCase';
import { ISearchProductsDTO, ISearchProductsResponse, SearchedProductsNotFoundErrorResponse } from './ISearchProductsDTO';

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
describe('Should analyse every possible end related to searching products', () => {
    it('Must not found results', async () => {
      // Arrange
      const iFactory = new ISearchProductsFactoryInMemory(products, cache);
      const sut: ISearchProductsUseCase = iFactory.compose();
      const { 
          name 
      }: ISearchProductsDTO = {
        name: 'a',
      };
      // Act
      const response: ISearchProductsResponse = await sut.execute({
          name
      });
      // Assert
      expect(response).toBeInstanceOf(SearchedProductsNotFoundErrorResponse);
      expect(response).not.toHaveProperty('result');
    });
    it('Must found products successfully', async () => {
      // Arrange
      products.push(product);
      const iFactory = new ISearchProductsFactoryInMemory(products, cache);
      const sut: ISearchProductsUseCase = iFactory.compose();
      const { 
          name 
      }: ISearchProductsDTO = {
        name: 'a',
      };
      // Act
      const response: ISearchProductsResponse = await sut.execute({
          name
      });
      // Assert
      expect(response).not.toBeInstanceOf(SearchedProductsNotFoundErrorResponse);
      expect(response).toHaveProperty('result');
    });
});
