import { ISavePurchaseFactoryInMemory } from '@application/factories/Purchase/SavePurchase/ISavePurchaseFactoryInMemory';
import { Product } from '@domain/entities/Product';
import { Purchase } from '@domain/entities/Purchase';
import { Purchase_Product_Pivot } from '@prisma/client';
import { ISavePurchaseUseCase } from './ISavePurchaseUseCase';
import { ISavePurchaseDTO, ISavePurchaseResponse } from './ISavePurchaseDTO';

const products: Product[] = [];
const purchases: Purchase[] = [];
const pivotPurchasesProducts: Purchase_Product_Pivot[] = [];
const cache: Map<string, string> = new Map<string, string>();
describe('Should analyse every possible end related to saving a purchase', () => {
  it('Must save a purchase successfully', async () => {
    // Arrange
    const iFactory = new ISavePurchaseFactoryInMemory(
      purchases,
      products,
      pivotPurchasesProducts,
      cache
    );
    const sut: ISavePurchaseUseCase = iFactory.compose();
    const {
        buyer_id, 
        title, 
        value 
    }: ISavePurchaseDTO = {
      buyer_id: '03f699c0d505826accdcdeef20426efadb62a701d2f5122117193dda29f5fa59',
      title: '03f699c0d505826accdcdeef20426efadb62a701d2f5122117193dda29f5fa593',
      value: 100,
    };
    // Act
    const response: ISavePurchaseResponse = await sut.execute({
        buyer_id,
        title,
        value
    });
    // Assert
    expect(response).toHaveProperty('purchase');
  });
});
