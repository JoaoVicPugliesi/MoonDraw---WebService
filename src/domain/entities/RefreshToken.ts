export interface IRefreshToken {
  id: number;
  public_id: string;
  expires_in: number;
  user_id: string;
}

export class RefreshToken implements IRefreshToken {
  constructor(
    readonly id: number,
    readonly public_id: string,
    public expires_in: number,
    readonly user_id: string
  ) {}
}
