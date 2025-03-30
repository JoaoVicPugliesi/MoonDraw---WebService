import { User } from './User';

interface IRefreshToken {
  id: number;
  public_id: string;
  expires_in: number;
  user: User;
  user_id: string
}

export class RefreshToken implements IRefreshToken {
    id: number;
    public_id: string;
    expires_in: number;
    user: User;
    user_id: string;

    constructor({ id, public_id, expires_in, user, user_id }: IRefreshToken) {
        this.id = id;
        this.public_id = public_id;
        this.expires_in = expires_in;
        this.user = user;
        this.user_id = user_id
    }
}
