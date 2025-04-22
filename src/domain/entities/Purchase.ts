type PurchaseStatus = 'pendent' | 'completed';

export interface IPurchase {
  readonly id: number;
  readonly public_id: string;
  readonly user_id: string;
  readonly value: number;
  readonly status: PurchaseStatus;
}

export class Purchase implements IPurchase {
  constructor(
    readonly id: number,
    readonly public_id: string,
    readonly user_id: string,
    readonly value: number,
    readonly status: PurchaseStatus
  ) {}
}
