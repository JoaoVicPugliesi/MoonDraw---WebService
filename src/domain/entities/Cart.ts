export interface ICart {
  id: number;
  public_id: string;
  user_id: string;
}

export class Cart implements ICart {
  constructor(
    readonly id: number,
    readonly public_id: string,
    readonly user_id: string
  ) {}
}
