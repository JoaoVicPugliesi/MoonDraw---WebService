// Primitive Types

type Role = "client" | "admin";

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
  email_verified_at?: Date;
}

export class User implements IUser {
  public id: number;
  public public_id: string;
  public name: string;
  public surname: string;
  public email: string;
  public password: string;
  public role: Role;
  public is_active: boolean;
  public created_at: Date;
  public email_verified_at?: Date;

  constructor({
    id,
    public_id,
    name,
    surname,
    email,
    password,
    role,
    is_active,
    created_at,
    email_verified_at,
  }: IUser) {
    this.id = id;
    this.public_id = public_id;
    this.name = name;
    this.surname = surname;
    this.email = email;
    this.password = password;
    this.role = role;
    this.is_active = is_active;
    this.created_at = created_at;
    this.email_verified_at = email_verified_at;
  }
}
