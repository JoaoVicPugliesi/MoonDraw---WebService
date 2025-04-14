export interface IProduct {
  id: number;
  public_id: string;
  name: string;
  description: string;
  price: number;
  supply: number;
  publisher: string;
  published_at: Date;
}

export class Product implements IProduct {
  constructor(
    readonly id: number,
    readonly public_id: string,
    readonly name: string,
    readonly description: string,
    readonly price: number,
    readonly supply: number,
    readonly publisher: string,
    readonly published_at: Date
  ) {}
}
