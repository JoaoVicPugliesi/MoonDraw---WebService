export interface IProduct {
  readonly id: number,
  readonly public_id: string,
  readonly images_id: string[],
  readonly artist_id: string,
  readonly name: string,
  readonly description: string,
  readonly price: number,
  readonly supply: number,
  readonly publisher: string,
  readonly published_at: Date,
  readonly updated_at: Date
}

export class Product implements IProduct {
  constructor(
    readonly id: number,
    readonly public_id: string,
    readonly images_id: string[],
    readonly artist_id: string,
    readonly name: string,
    readonly description: string,
    readonly price: number,
    readonly supply: number,
    readonly publisher: string,
    readonly published_at: Date,
    readonly updated_at: Date
  ) {}
}
