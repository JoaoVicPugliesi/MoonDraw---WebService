type Role = 'Buyer' | 'Artist' | 'Admin';

export interface IUser {
  readonly id: number,
  readonly public_id: string,
  readonly name: string,
  readonly surname: string,
  readonly email: string,
  readonly description: string,
  readonly password: string,
  readonly role: Role,
  is_email_verified: boolean,
  readonly created_at: Date,
  last_login_at: Date,
  email_verified_at?: Date | null
}

export class User implements IUser {

  constructor(
    readonly id: number,
    readonly public_id: string,
    readonly name: string,
    readonly surname: string,
    readonly email: string,
    readonly description: string,
    readonly password: string,
    readonly role: Role,
    public is_email_verified: boolean,
    readonly created_at: Date,
    public last_login_at: Date,
    public email_verified_at?: Date | null
  ) {}
}

