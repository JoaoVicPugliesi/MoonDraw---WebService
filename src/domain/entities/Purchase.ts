type PurchaseStatus = 'Pending' | 'Completed';

export interface IPurchase {
  readonly id: number,
  readonly public_id: string,
  readonly buyer_id: string,
  readonly title: string,
  readonly value: number,
  readonly status: PurchaseStatus,
  readonly created_at: Date,
  readonly updated_at: Date,
  readonly payment_method?: string | null,
  readonly completed_at?: Date | null
}

export class Purchase implements IPurchase {
  constructor(
    readonly id: number,
    readonly public_id: string,
    readonly buyer_id: string,
    readonly title: string,
    readonly value: number,
    readonly status: PurchaseStatus,
    readonly created_at: Date,
    readonly updated_at: Date,
    readonly payment_method?: string | null,
    readonly completed_at?: Date | null
  ) {}
}
