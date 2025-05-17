import { Product } from '@domain/entities/Product';
import { Purchase } from '@domain/entities/Purchase';
import { Purchase_Product_Pivot } from '@prisma/client';
import { randomUUID } from 'crypto';
import { ICompletePurchaseFactoryInMemory } from '@application/factories/Purchase/CompletePurchase/ICompletePurchaseFactoryInMemory';
import { Delivery } from '@domain/entities/Delivery';
import { ICompletePurchaseUseCase } from './ICompletePurchaseUseCase';
import { ICompletePurchaseDTO, ICompletePurchaseResponse, PurchaseHasNoOwnerErrorResponse } from './ICompletePurchaseDTO';

const purchases: Purchase[] = [];
const products: Product[] = [];
const pivot_purchases_products: Purchase_Product_Pivot[] = [];
const deliveries: Delivery[] = [];
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
products.push(product);
describe('Should analyse every possible end related to completing purchases', () => {
  it('Must not complete purchase because owner was not found', async () => {
    // Arrange
    const iFactory = new ICompletePurchaseFactoryInMemory(
      purchases,
      products,
      pivot_purchases_products,
      deliveries
    );
    const sut: ICompletePurchaseUseCase = iFactory.compose();
    const { 
      purchase_id,
      session_id
    }: ICompletePurchaseDTO = {
      purchase_id: '03f699c0d505826accdcdeef20426efadb62a701d2f5122117193dda29f5fa59',
      session_id: '03f699c0d505826accdcdeef20426efadb62a701d2f5122117193dda29f5fa59'
    };
    // Act
    const response: ICompletePurchaseResponse = await sut.execute({
        purchase_id,
        session_id
    });
    // Assert
    expect(response).toBeInstanceOf(PurchaseHasNoOwnerErrorResponse);
    expect(response).not.toHaveProperty('success');
  });
  it('Must complete purchase successfully', async () => {
    // Arrange
    purchases.push(purchase);
    const iFactory = new ICompletePurchaseFactoryInMemory(
      purchases,
      products,
      pivot_purchases_products,
      deliveries
    );
    const sut: ICompletePurchaseUseCase = iFactory.compose();
    const { 
      purchase_id,
      session_id
    }: ICompletePurchaseDTO = {
      purchase_id: '03f699c0d505826accdcdeef20426efadb62a701d2f5122117193dda29f5fa59',
      session_id: '03f699c0d505826accdcdeef20426efadb62a701d2f5122117193dda29f5fa59'
    };
    // Act
    const response: ICompletePurchaseResponse = await sut.execute({
        purchase_id,
        session_id
    });
    // Assert
    expect(response).not.toBeInstanceOf(PurchaseHasNoOwnerErrorResponse);
    expect(response).toHaveProperty('success');
  });
});
