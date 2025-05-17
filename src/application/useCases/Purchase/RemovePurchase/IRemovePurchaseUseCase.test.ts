import { IRemovePurchaseFactoryInMemory } from '@application/factories/Purchase/RemovePurchase/IRemovePurchaseFactoryInMemory';
import { Product } from '@domain/entities/Product';
import { Purchase } from '@domain/entities/Purchase';
import { Purchase_Product_Pivot } from '@prisma/client';
import { IRemovePurchaseUseCase } from './IRemovePurchaseUseCase';
import {
  IRemovePurchaseDTO,
  IRemovePurchaseResponse,
} from './IRemovePurchaseDTO';

const products: Product[] = [];
const purchases: Purchase[] = [];
const pivotPurchasesProducts: Purchase_Product_Pivot[] = [];
describe('Should analyse every possible end related to removing purchases', () => {
  it('Must remove a purchase successfully', async () => {
    // Arrange
    const iFactory = new IRemovePurchaseFactoryInMemory(
      purchases,
      products,
      pivotPurchasesProducts
    );
    const sut: IRemovePurchaseUseCase = iFactory.compose();
    const { public_id }: IRemovePurchaseDTO = {
      public_id:
        '03f699c0d505826accdcdeef20426efadb62a701d2f5122117193dda29f5fa59',
    };
    // Act
    const response: IRemovePurchaseResponse = await sut.execute({
      public_id,
    });
    // Assert
    expect(response).toHaveProperty('success');
  });
});
