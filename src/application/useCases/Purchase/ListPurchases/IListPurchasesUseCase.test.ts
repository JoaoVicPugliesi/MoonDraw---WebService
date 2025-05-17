import { IListPurchasesFactoryInMemory } from '@application/factories/Purchase/ListPurchases/IListPurchasesFactoryInMemory';
import { Product } from '@domain/entities/Product';
import { Purchase } from '@domain/entities/Purchase';
import { Purchase_Product_Pivot } from '@prisma/client';
import { IListPurchasesUseCase } from './IListPurchasesUseCase';
import {
  IListPurchaseResponse,
  IListPurchasesDTO,
  PurchasesNotFoundErrorResponse,
} from './IListPurchasesDTO';

const purchases: Purchase[] = [];
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
purchases.push(purchase);
const products: Product[] = [];
const pivot_purchases_products: Purchase_Product_Pivot[] = [];
const cache: Map<string, string> = new Map<string, string>();
describe('Should analyse every possible end related to listing purchases', () => {
  it('Must not list purchases because purchases were not found', async () => {
    // Arrange
    const iFactory = new IListPurchasesFactoryInMemory(
      purchases.toSpliced(0),
      products,
      pivot_purchases_products,
      cache
    );
    const sut: IListPurchasesUseCase = iFactory.compose();
    const { 
      buyer_id, 
      status 
    }: IListPurchasesDTO = {
      buyer_id: '03f699c0d505826accdcdeef20426efadb62a701d2f5122117193dda29f5fa59',
      status: 'Pending',
    };
    // Act
    const response: IListPurchaseResponse = await sut.execute({
      buyer_id,
      status,
    });
    console.log(response);
    // Assert
    expect(response).toBeInstanceOf(PurchasesNotFoundErrorResponse);
    expect(response).not.toHaveProperty('purchases');
  });
  it('Must list purchases successfully', async () => {
    // Arrange
    const iFactory = new IListPurchasesFactoryInMemory(
      purchases,
      products,
      pivot_purchases_products,
      cache
    );
    const sut: IListPurchasesUseCase = iFactory.compose();
    const { 
      buyer_id, 
      status 
    }: IListPurchasesDTO = {
      buyer_id: '03f699c0d505826accdcdeef20426efadb62a701d2f5122117193dda29f5fa59',
      status: 'Pending',
    };
    // Act
    const response: IListPurchaseResponse = await sut.execute({
      buyer_id,
      status,
    });
    // Assert
    expect(response).not.toBeInstanceOf(PurchasesNotFoundErrorResponse);
    expect(response).toHaveProperty('purchases');
  });
});
