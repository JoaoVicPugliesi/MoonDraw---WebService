import { Product } from '@domain/entities/Product';
import { Purchase } from '@domain/entities/Purchase';
import { Purchase_Product_Pivot } from '@prisma/client';
import { IAttachProductIntoPurchaseUseCase } from './IAttachProductIntoPurchaseUseCase';
import { IAttachProductIntoPurchaseFactoryInMemory } from '@application/factories/Purchase/AttachProductIntoPurchase/IAttachProductIntoPurchaseFactoryInMemory';
import { IAttachProductIntoPurchaseDTO, IAttachProductIntoPurchaseResponse } from './IAttachProductIntoPurchaseDTO';

const purchases: Purchase[] = [];
const products: Product[] = [];
const pivot_purchases_products: Purchase_Product_Pivot[] = [];

describe('Should analyse every possible end related to checking out purchases', () => {
  it('Should attach product into purchase', async () => {
    // Arrange
    const iFactory = new IAttachProductIntoPurchaseFactoryInMemory(
        purchases,
        products,
        pivot_purchases_products
    )
    const sut: IAttachProductIntoPurchaseUseCase = iFactory.compose();
    const {
        purchase_id,
        product_id,
        quantity
    }: IAttachProductIntoPurchaseDTO = {
       purchase_id: '03f699c0d505826accdcdeef20426efadb62a701d2f5122117193dda29f5fa59',
       product_id: '03f699c0d505826accdcdeef20426efadb62a701d2f5122117193dda29f5fa59',
       quantity: 0
    }
    // Act
    const response: IAttachProductIntoPurchaseResponse = await sut.execute({
        purchase_id,
        product_id,
        quantity
    });
    // Assert
    expect(response).toHaveProperty('success');
    expect(response.success).toBeTruthy();
  });
 
});
