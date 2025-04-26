import {
  CheckoutPurchase,
  IPurchaseRepository,
} from '@domain/repositories/IPurchaseRepository';
import { ICacheProvider } from '@domain/providers/Cache/ICacheProvider';
import { IPaymentProvider } from '@domain/providers/Payment/IPaymentProvider';
import { ICheckoutPurchaseDTO } from './ICheckoutPurchaseDTO';
import { ILineItem } from '@domain/providers/Payment/Payment';
import { ICheckoutPurchaseResponse, PurchaseNotFoundErrorResponse } from '@application/handlers/UseCasesResponses/Purchase/ICheckoutPurchaseHandlers';

export class ICheckoutPurchaseUseCase {
  constructor(
    private readonly iPurchaseRepository: IPurchaseRepository,
    private readonly iPaymentProvider: IPaymentProvider,
    private readonly iCacheProvider: ICacheProvider
  ) {}

  async execute({ 
    public_id 
  }: ICheckoutPurchaseDTO): Promise<ICheckoutPurchaseResponse | PurchaseNotFoundErrorResponse> {
    const lineItems: ILineItem[] = [];
    let item: ILineItem;
    
    const cachedPurchase: string | null = await this.iCacheProvider.get(
      `purchase-${public_id}`
    );

    if (cachedPurchase) {
      const cachedPurchaseParsed: CheckoutPurchase[] = JSON.parse(cachedPurchase);
      for (const p of cachedPurchaseParsed) {
        item = {
          price_data: {
            currency: 'brl',
            unit_amount: p.product.price * 100,
            product_data: {
              name: p.product.name,
              description: p.product.description,
              images: [p.product.image_id],
            },
          },
          quantity: p.quantity,
        };
        lineItems.push(item);
      }

      const cachedPurchaseURL: string | null = await this.iCacheProvider.get(
        `purchase-${public_id}-url`
      )

      if(cachedPurchaseURL) {
        return {
          url: cachedPurchaseURL
        }
      }

      const { url } = await this.iPaymentProvider.create({
        line_items: lineItems,
        cancel_url: 'https://localhost:5000',
        success_url: 'https://localhost:8000/api/purchases/purchase/complete?purchase_id=${public_id}&session_id={CHECKOUT_SESSION_ID}',
        mode: 'payment',
        shipping_address_collection: {
          allowed_countries: ['US', 'BR']
        }
      });

      await this.iCacheProvider.set(
        `purchase-${public_id}-url`,
        url,
        {
          EX: 300
        }
      )
      
      return {
        url: url,
      };
    }
    const purchase: CheckoutPurchase[] | null =
      await this.iPurchaseRepository.checkoutPurchase({
        public_id,
      });
      
    if (!purchase) return new PurchaseNotFoundErrorResponse();
    
    await this.iCacheProvider.set(
      `purchase-${public_id}`,
      JSON.stringify(purchase),
      {
        EX: 3600,
      }
    );

    for (const p of purchase) {
      item = {
        price_data: {
          currency: 'brl',
          unit_amount: p.product.price * 100,
          product_data: {
            name: p.product.name,
            description: p.product.description,
            images: [p.product.image_id],
          },
        },
        quantity: p.quantity,
      };
      lineItems.push(item);
    }

    const cachedPurchaseURL: string | null = await this.iCacheProvider.get(
      `purchase-${public_id}-url`
    )
    
    if(cachedPurchaseURL) {
      return {
        url: cachedPurchaseURL
      }
    }
    
    const { url } = await this.iPaymentProvider.create({
      line_items: lineItems,
      cancel_url: 'https://localhost:5000',
      success_url: `https://localhost:8000/api/purchases/purchase/complete?session_id={CHECKOUT_SESSION_ID}&purchase_id=${public_id}`,
      mode: 'payment',
      shipping_address_collection: {
        allowed_countries: ['US', 'BR']
      }
    });
    
    await this.iCacheProvider.set(
      `purchase-${public_id}-url`,
      url,
      {
        EX: 300
      }
    )
    
    return {
      url: url,
    };
  }
}
