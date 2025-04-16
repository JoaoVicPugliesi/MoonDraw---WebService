type Role = 'client' | 'admin';

export interface IUser {
  id: number;
  public_id: string;
  name: string;
  surname: string;
  email: string;
  password: string;
  role: Role;
  is_active: boolean;
  created_at: Date;
  email_verified_at?: Date | null;
}

export class User implements IUser {
  constructor(
    readonly id: number,
    readonly public_id: string,
    readonly name: string,
    readonly surname: string,
    readonly email: string,
    readonly password: string,
    readonly role: Role,
    public is_active: boolean,
    readonly created_at: Date,
    public email_verified_at?: Date | null
  ) {}
}
