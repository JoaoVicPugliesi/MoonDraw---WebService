import { IFetchProductsInMemoryFactory } from '@application/factories/Product/IFetchProducts/IFetchProductsInMemoryFactory';
import { IFetchProductsDTO } from '@application/useCases/Product/FetchProducts/IFetchProductsDTO';

import { Product } from '@domain/entities/Product';
import { IFetchProductsUseCase } from './IFetchProductsUseCase';
import { InvalidProductsNotFoundErrorResponse, FetchProductsResponse } from '@application/handlers/UseCasesResponses/Product/IFetchProductsHandlers';
import { randomUUID } from 'crypto';

const products: Product[] = [];
const product: Product = {
  id: products.length + 1,
  public_id: randomUUID(),
  name: 'Air Jordan',
  desc: 'No Description',
  price: 5.99,
  supply: 100,
  publisher: 'Nike',
  published_at: new Date(),
}
products.push(product);
const map: Map<string, string> = new Map<string, string>();
describe('I Fetch products use case', () => {
  it('should Fetch products based on the IFetchProductsDTO and pageSize', async () => {
    // Arrange
    const iFetchProductsInMemoryFactory = new IFetchProductsInMemoryFactory(
      products,
      map
    );
    const sut: IFetchProductsUseCase = iFetchProductsInMemoryFactory.compose();
    const { page }: IFetchProductsDTO = {
      page: 1,
    };

    // Act
    const response: FetchProductsResponse | InvalidProductsNotFoundErrorResponse = await sut.execute({
      page,
    });

    // Assert
    expect(response).not.toBeInstanceOf(InvalidProductsNotFoundErrorResponse);
    expect(response).toHaveProperty('products');
  });
});
