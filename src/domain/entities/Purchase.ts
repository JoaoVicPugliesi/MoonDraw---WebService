type Status = 'pendent' | 'completed' | 'canceled';

export interface IPurchase {
  readonly id: number;
  readonly public_id: string;
  readonly user_id: string;
  readonly value: number;
  readonly status: Status;
}

export class Purchase implements IPurchase {
  constructor(
    readonly id: number,
    readonly public_id: string,
    readonly user_id: string,
    readonly value: number,
    readonly status: Status
  ) {}
}
