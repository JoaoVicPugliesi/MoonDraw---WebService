import {
  CheckoutPurchase,
  IPurchaseRepository,
} from '@domain/repositories/IPurchaseRepository';
import { ICacheService } from '@domain/services/ICacheService';
import { IPaymentService } from '@domain/services/IPaymentService';
import { ICheckoutPurchaseDTO } from './ICheckoutPurchaseDTO';
import { ILineItem } from '@domain/services/helpers/Payment';
import { ICheckoutPurchaseResponse, PurchaseNotFoundErrorResponse } from '@application/handlers/UseCasesResponses/Purchase/ICheckoutPurchaseHandlers';

export class ICheckoutPurchaseUseCase {
  constructor(
    private readonly iPurchaseRepository: IPurchaseRepository,
    private readonly iPaymentService: IPaymentService,
    private readonly iCacheService: ICacheService
  ) {}

  async execute({ 
    public_id 
  }: ICheckoutPurchaseDTO): Promise<ICheckoutPurchaseResponse | PurchaseNotFoundErrorResponse> {
    const lineItems: ILineItem[] = [];
    let item: ILineItem;
    
    const cachedPurchase: string | null = await this.iCacheService.get(
      `checked-purchase-${public_id}`
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

      const cachedPurchaseURL: string | null = await this.iCacheService.get(
        `checked-checked-purchase-${public_id}-url`
      )

      if(cachedPurchaseURL) {
        return {
          url: cachedPurchaseURL
        }
      }

      const { url } = await this.iPaymentService.create({
        line_items: lineItems,
        cancel_url: 'http://localhost:5000',
        success_url: 'http://localhost:8000',
        mode: 'payment',
        shipping_address_collection: {
          allowed_countries: ['US', 'BR']
        }
      });

      await this.iCacheService.set(
        `checked-purchase-${public_id}-url`,
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
    
    await this.iCacheService.set(
      `checked-purchase-${public_id}`,
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

    const cachedPurchaseURL: string | null = await this.iCacheService.get(
      `checked-purchase-${public_id}-url`
    )
    
    if(cachedPurchaseURL) {
      return {
        url: cachedPurchaseURL
      }
    }
    
    const { url } = await this.iPaymentService.create({
      line_items: lineItems,
      cancel_url: 'http://localhost:5000',
      success_url: 'http://localhost:8000',
      mode: 'payment',
      shipping_address_collection: {
        allowed_countries: ['US', 'BR']
      }
    });
    
    await this.iCacheService.set(
      `checked-purchase-${public_id}-url`,
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
