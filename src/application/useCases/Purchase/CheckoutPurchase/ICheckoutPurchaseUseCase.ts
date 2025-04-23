import { CheckoutPurchase, IPurchaseRepository } from '@domain/repositories/IPurchaseRepository';
import { ICacheService } from '@domain/services/ICacheService';
import { IPaymentService } from '@domain/services/IPaymentService';
import { ICheckoutPurchaseDTO } from './ICheckoutPurchaseDTO';
import { ILineItem } from '@domain/services/helpers/Payment';

export class ICheckoutPurchaseUseCase {
  constructor(
    private readonly iPurchaseRepository: IPurchaseRepository,
    private readonly iPaymentService: IPaymentService,
    private readonly iCacheService: ICacheService
  ) {}

  async execute({ 
    public_id
  }: ICheckoutPurchaseDTO): Promise<any> {
    const lineItems: ILineItem[] = [];
    let item: ILineItem;

    const cachedPurchase: string | null = await this.iCacheService.get(
      `purchase-${public_id}`
    );

    if(cachedPurchase) {
        const cachedPurchaseParsed: CheckoutPurchase[] = JSON.parse(cachedPurchase);
        for(const p of cachedPurchaseParsed) {
          item = {
            price_data: {
              currency: 'brl',
              product_data: {
                name: p.product.name,
                description: p.product.description,
                images: [ p.product.image_id ],
              }
            },
            unit_amount: p.product.price * 100,
            quantity: p.quantity
          }
          lineItems.push(item);
        }
    
        const { url } = await this.iPaymentService.create({
            line_items: lineItems,
            cancel_url: '',
            success_url: '',
            mode: 'payment'
        })

        return {
          url: url
        }
    }
    const purchase: CheckoutPurchase[] | null = await this.iPurchaseRepository.checkoutPurchase({
        public_id
    });

    if(!purchase) return false;

    await this.iCacheService.set(
      `purchase-${public_id}`,
      JSON.stringify(purchase),
      {
        EX: 3600
      }
    )

    for(const p of purchase) {
      item = {
        price_data: {
          currency: 'brl',
          product_data: {
            name: p.product.name,
            description: p.product.description,
            images: [ p.product.image_id ],
          }
        },
        unit_amount: p.product.price * 100,
        quantity: p.quantity
      }
      lineItems.push(item);
    }

    const { url } = await this.iPaymentService.create({
        line_items: lineItems,
        cancel_url: '',
        success_url: '',
        mode: 'payment'
    });

    return {
      url: url
    }

   }
}
