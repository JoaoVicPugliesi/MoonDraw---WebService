export interface IRefreshToken {
  readonly id: number,
  readonly public_id: string,
  expires_in: number,
  readonly owner_id: string
}

export class RefreshToken implements IRefreshToken {
  constructor(
    readonly id: number,
    readonly public_id: string,
    public expires_in: number,
    readonly owner_id: string
  ) {}
}
