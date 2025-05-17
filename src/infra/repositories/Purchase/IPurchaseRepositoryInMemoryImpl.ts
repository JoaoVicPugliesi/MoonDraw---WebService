import { Product } from "@domain/entities/Product";
import { Purchase } from "@domain/entities/Purchase";
import { IAttachProductIntoPurchaseDTO } from "@application/useCases/Purchase/AttachProductIntoPurchase/IAttachProductIntoPurchaseDTO";
import { ICheckoutPurchaseDTO } from "@application/useCases/Purchase/CheckoutPurchase/ICheckoutPurchaseDTO";
import { ICompletePurchaseDTO } from "@application/useCases/Purchase/CompletePurchase/ICompletePurchaseDTO";
import { IListPurchasesDTO } from "@application/useCases/Purchase/ListPurchases/IListPurchasesDTO";
import { IMeasurePurchaseDTO } from "@application/useCases/Purchase/MeasurePurchase/IMeasurePurchaseDTO";
import { IRemovePurchaseDTO } from "@application/useCases/Purchase/RemovePurchase/IRemovePurchaseDTO";
import { ISavePurchaseDTO } from "@application/useCases/Purchase/SavePurchase/ISavePurchaseDTO";
import { ICacheProvider } from "@domain/providers/Cache/ICacheProvider";
import {
  CheckoutPurchase,
  IPurchaseRepository,
} from "@domain/repositories/IPurchaseRepository";
import { randomUUID } from "crypto";
import { Purchase_Product_Pivot } from "@prisma/client";

export class IPurchaseRepositoryInMemoryImpl implements IPurchaseRepository {
  constructor(
    private purchases: Purchase[],
    private readonly products: Product[],
    private readonly pivot_product_purchase: Purchase_Product_Pivot[]
  ) {}
  async attachProductIntoPurchase(
    {
        purchase_id,
        product_id,
        quantity
    }: IAttachProductIntoPurchaseDTO
  ): Promise<void> {
    this.pivot_product_purchase.push({
        purchase_id,
        product_id,
        quantity
    });
  }
  async measurePurchase(
    DTO: IMeasurePurchaseDTO[],
    iCacheProvider: ICacheProvider
  ): Promise<number> {
    let value: number = 0;
    for (const p of DTO) {
      const product: Product | undefined = this.products.find(
        (i: Product) => i.public_id === p.product_id
      );
      if (product) {
        value += product.price * 100 * p.quantity;
      }
    }
    return value;
  }
  async savePurchase({
    buyer_id,
    title,
    value,
  }: ISavePurchaseDTO): Promise<Purchase> {
    const purchase: Purchase = {
      id: this.purchases.length + 1,
      public_id: randomUUID(),
      buyer_id: buyer_id,
      title: title,
      value: value,
      status: "Pending",
      created_at: new Date(),
      updated_at: new Date(),
    };
    this.purchases.push(purchase);
    return purchase;
  }
  async listPurchases({
    buyer_id,
    status
  }: IListPurchasesDTO): Promise<Purchase[] | null> {
    const purchases: Purchase[] | undefined = this.purchases.filter((
        p: Purchase) => p.buyer_id === buyer_id && p.status === status
    )
    if(typeof purchases === 'undefined') return null;

    return purchases;
  }
  async checkoutPurchase(
    {
        public_id
    }: ICheckoutPurchaseDTO
  ): Promise<CheckoutPurchase[] | null> {
    const iCheckoutPurchase: CheckoutPurchase[] = [];
    const purchase: Purchase | undefined = this.purchases.find(
        (p: Purchase) => p.public_id === public_id
    )
    if(!purchase) return null;
    const iProductsPurchaseIds: Purchase_Product_Pivot[] = this.pivot_product_purchase.filter(
        (i: Purchase_Product_Pivot) => i.purchase_id === purchase?.public_id
    )
    for(const i of iProductsPurchaseIds) {
        const product: Product | undefined = this.products.find((p: Product) => p.public_id === i.product_id);
        if(!product) return null;
        iCheckoutPurchase.push({
            purchase_id: i.purchase_id,
            product_id: i.product_id,
            quantity: i.quantity,
            product: product 
        });
    }
    return iCheckoutPurchase;
  }
  async removePurchase({
    public_id
  }: IRemovePurchaseDTO): Promise<void> {
    const filteredPurchases: Purchase[] | undefined = this.purchases.filter(
        (p: Purchase) => p.public_id !== public_id
    )

    this.purchases = filteredPurchases ?? [];
  }
  async completePurchase({
    purchase_id,
    payment_method
  }: {
    purchase_id: string;
    payment_method: string;
  }): Promise<void> {
    const purchase: Purchase | undefined = this.purchases.find(
        (p: Purchase) => p.public_id === purchase_id
    );
    if(purchase) {
        purchase.payment_method = payment_method
    }

  }
  async findPurchaseOwner(
    {
        purchase_id
    }: Pick<ICompletePurchaseDTO, "purchase_id">
  ): Promise<Pick<Purchase, "buyer_id"> | null> {
     const purchase: Purchase | undefined = this.purchases.find(
        (p: Purchase) => p.public_id === purchase_id
    );
    if(!purchase) return null;
    return {
        buyer_id: purchase.buyer_id
    }
  }
}
