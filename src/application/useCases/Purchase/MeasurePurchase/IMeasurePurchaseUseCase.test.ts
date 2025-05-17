import { IMeasurePurchaseFactoryInMemory } from '@application/factories/Purchase/MeasurePurchase/IMeasurePurchaseFactoryInMemory';
import { IMeasurePurchaseUseCase } from './IMeasurePurchaseUseCase';
import { IMeasurePurchaseDTO } from './IMeasurePurchaseDTO';
import { Product } from '@domain/entities/Product';
import { Purchase } from '@domain/entities/Purchase';
import { Purchase_Product_Pivot } from '@prisma/client';

const products: Product[] = [];
const purchases: Purchase[] = [];
const pivotPurchasesProducts: Purchase_Product_Pivot[] = [];
const cache: Map<string, string> = new Map<string, string>();
describe('Should analyse every possible end related to measuring purchases', () => {
  it('Must measure purchase successfully', async () => {
    // Arrange
    const iFactory = new IMeasurePurchaseFactoryInMemory(
        purchases,
        products,
        pivotPurchasesProducts,
        cache
    );
    const sut: IMeasurePurchaseUseCase = iFactory.compose();
    const {
        product_id,
        quantity
    }: IMeasurePurchaseDTO = {
        product_id: '',
        quantity: 0
    }
    // Act
    const response: number = await sut.execute([
        {
            product_id: product_id,
            quantity: quantity
        },
    ])
    // Assert
    expect(response).toBeDefined()
  });
});
