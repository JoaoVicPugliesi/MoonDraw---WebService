type Mode = 'payment' | 'subscription';
type Currency = 'usd' | 'brl';

interface IProductData {
  name: string;
  description?: string;
  images?: Array<any>;
}

type AllowedCountry = 'US' | 'BR';

interface ShippingAddressCollection {
  allowed_countries: Array<AllowedCountry>;
}

export interface ILineItem {
  price_data: {
    currency: Currency;
    unit_amount: number;
    product_data: IProductData;
  };
  quantity: number;
}

export interface IPayment {
  readonly line_items: ILineItem[];
  readonly cancel_url: string;
  readonly success_url: string;
  readonly mode: Mode;
  readonly shipping_address_collection: ShippingAddressCollection;
}

export class Payment implements IPayment {
  constructor(
    readonly line_items: ILineItem[],
    readonly cancel_url: string,
    readonly success_url: string,
    readonly mode: Mode,
    readonly shipping_address_collection: ShippingAddressCollection
  ) {}
}
