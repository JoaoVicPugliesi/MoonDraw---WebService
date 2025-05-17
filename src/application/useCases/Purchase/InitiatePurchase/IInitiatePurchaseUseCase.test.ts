import { IInitiatePurchaseFactoryInMemory } from '@application/factories/Purchase/InitiatePurchase/IInitiatePurchaseFactoryInMemory';
import { Product } from '@domain/entities/Product';
import { Purchase } from '@domain/entities/Purchase';
import { Purchase_Product_Pivot } from '@prisma/client';
import { IInitiatePurchaseUseCase } from './IInitiatePurchaseUseCase';
import { IInitiatePurchaseDTO, IInitiatePurchaseResponse } from './IInitiatePurchaseDTO';
import { randomUUID } from 'crypto';

const purchases: Purchase[] = [];
const products: Product[] = [];
const pivot_purchases_products: Purchase_Product_Pivot[] = [];
const cache: Map<string, string> = new Map<string, string>();
const purchase: Purchase = {
  id: 0,
  public_id: '03f699c0d505826accdcdeef20426efadb62a701d2f5122117193dda29f5fa59',
  buyer_id: '03f699c0d505826accdcdeef20426efadb62a701d2f5122117193dda29f5fa59',
  title: 'House Chores',
  value: 0,
  status: 'Pending',
  created_at: new Date(),
  updated_at: new Date(),
  payment_method: '',
  completed_at: new Date(),
};
const product: Product = {
  id: products.length + 1,
  public_id: randomUUID(),
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
purchases.push(purchase);
products.push(product);
describe('Should analyse every possible end related to initiating purchases', () => {
  it('Must not list purchases because purchases were not found', async () => {
    // Arrange
    const iFactory = new IInitiatePurchaseFactoryInMemory(
      purchases,
      products,
      pivot_purchases_products,
      cache
    );
    const sut: IInitiatePurchaseUseCase = iFactory.compose();
    const { 
      buyer_id,
      title, 
      selected_products
    }: IInitiatePurchaseDTO = {
      buyer_id: '03f699c0d505826accdcdeef20426efadb62a701d2f5122117193dda29f5fa59',
      title: 'Basketball Vibes',
      selected_products: [
        {
            product_id: product.public_id,
            quantity: 2
        }
      ]
    };
    // Act
    const response: IInitiatePurchaseResponse = await sut.execute({
        buyer_id,
        title,
        selected_products
    });
    // Assert
    expect(response).toHaveProperty('success');
  });
});
