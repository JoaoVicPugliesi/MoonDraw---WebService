import { ISelectProductsDTO } from '@application/useCases/Product/SelectProducts/ISelectProductsDTO';
import { ISelectProductsInMemoryFactory } from '@application/factories/Product/ISelectProducts/ISelectProductsInMemoryFactory';
import { Product } from '@domain/entities/Product';
import { ISelectProductsUseCase } from './ISelectProductsUseCase';
import { InvalidProductsNotFoundErrorResponse, SelectProductsResponse } from '@application/handlers/UseCasesResponses/Product/ISelectProductsHandlers';
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
describe('I select products use case', () => {
  it('should select products based on the ISelectProductsDTO and pageSize', async () => {
    // Arrange
    const iSelectProductsInMemoryFactory = new ISelectProductsInMemoryFactory(
      products,
      map
    );
    const sut: ISelectProductsUseCase = iSelectProductsInMemoryFactory.compose();
    const { page }: ISelectProductsDTO = {
      page: 1,
    };

    // Act
    const response: SelectProductsResponse | InvalidProductsNotFoundErrorResponse = await sut.execute({
      page,
    });

    // Assert
    expect(response).not.toBeInstanceOf(InvalidProductsNotFoundErrorResponse);
    expect(response).toHaveProperty('products');
  });
});
