import { ICheckoutPurchaseFactoryInMemory } from "@application/factories/Purchase/CheckoutPurchase/ICheckoutPurchaseFactoryInMemory";
import { Product } from "@domain/entities/Product";
import { Purchase } from "@domain/entities/Purchase";
import { Purchase_Product_Pivot } from "@prisma/client";
import { randomUUID } from "crypto";
import { ICheckoutPurchaseUseCase } from "./ICheckoutPurchaseUseCase";
import { ICheckoutPurchaseDTO, ICheckoutPurchaseResponse, PurchaseNotFoundErrorResponse } from "./ICheckoutPurchaseDTO";

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
describe("Should analyse every possible end related to checking out purchases", () => {
  it("Should not checkout because purchase does not exist", async () => {
    // Arrange
    const iFactory = new ICheckoutPurchaseFactoryInMemory(
        purchases,
        products,
        pivot_purchases_products,
        cache
    )
    const sut: ICheckoutPurchaseUseCase = iFactory.compose();
    const {
        public_id
    }: ICheckoutPurchaseDTO = {
        public_id: '03f699c0d505826accdcdeef20426efadb62a701d2f5122117193dda29f5fa59'
    }
    // Act
    const response: ICheckoutPurchaseResponse = await sut.execute({
        public_id
    });
    // Assert
    expect(response).toBeInstanceOf(PurchaseNotFoundErrorResponse);
    expect(response).not.toHaveProperty('url');
  });
  it("Should checkout purchase successfully", async () => {
    // Arrange
    purchases.push(purchase);
    const iFactory = new ICheckoutPurchaseFactoryInMemory(
        purchases,
        products,
        pivot_purchases_products,
        cache
    )
    const sut: ICheckoutPurchaseUseCase = iFactory.compose();
    const {
        public_id
    }: ICheckoutPurchaseDTO = {
        public_id: '03f699c0d505826accdcdeef20426efadb62a701d2f5122117193dda29f5fa59'
    }
    // Act
    const response: ICheckoutPurchaseResponse = await sut.execute({
        public_id
    });
    // Assert
    expect(response).not.toBeInstanceOf(PurchaseNotFoundErrorResponse);
    expect(response).toHaveProperty('url');
  });
});
