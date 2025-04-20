export interface ICart {
  readonly id: number;
  readonly public_id: string;
  readonly user_id: string;
}

export class Cart implements ICart {
  constructor(
    readonly id: number,
    readonly public_id: string,
    readonly user_id: string
  ) {}
}
