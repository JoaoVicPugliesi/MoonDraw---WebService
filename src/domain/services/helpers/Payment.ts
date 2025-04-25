type Mode = 'payment' | 'subscription';
type Currency = 'usd' | 'brl';

interface IProductData {
  name: string,
  description?: string,
  images?: Array<any>
}

export type AllowedCountry = 'US' | 'BR';

interface ShippingAddressCollection {
  allowed_countries: Array<AllowedCountry>;
}

export interface ILineItem {
  price_data: {
    currency: Currency,
    unit_amount: number,
    product_data: IProductData,
  };
  quantity: number
}

export interface IPayment {
  readonly line_items: ILineItem[],
  readonly cancel_url: string,
  readonly success_url: string,
  readonly mode: Mode,
  readonly shipping_address_collection: ShippingAddressCollection
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

export interface IRetrieveParams {
  expand: Array<string>;
}

export interface IRetrieveResponse {
  customer_details: {
    address: {
      city?: string | null;
      country?: string | null;
      line1?: string | null;
      line2?: string | null;
      postal_code?: string | null;
      state?: string | null;
    } | null;
    email: string | null;
    name: string | null;
    phone: string | null;
    tax_exempt: string | null;
    tax_ids: any[] | null;
  } | null;
  payment_intent: object | string | null;
  object: string;
  data?: Array<{
    id: string;
    object: string;
    amount_discount: number;
    amount_subtotal: number;
    amount_tax: number;
    amount_total: number;
    currency: string;
    description: string;
    price: object;
    quantity: number;
  }>;
  url: string | null;
}