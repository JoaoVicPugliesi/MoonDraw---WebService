type Mode = 'payment' | 'subscription';
type Currency =  'usd' | 'brl';

interface IProductData {
    name: string,
    description?: string,
    images?: Array<string>
}

export interface ILineItem {
    price_data: {
        currency: Currency,
        product_data: IProductData,
    },
    unit_amount: number,
    quantity: number
}

export interface IPayment {
    readonly line_items: ILineItem[],
    readonly cancel_url: string,
    readonly success_url: string,
    readonly mode: Mode
}

export class Payment implements IPayment {
    constructor(
        readonly line_items: ILineItem[],
        readonly cancel_url: string,
        readonly success_url: string,
        readonly mode: Mode
    ) {}
}