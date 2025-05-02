import { User } from '@domain/entities/User';
import { IRegisterDTO } from '@application/useCases/User/Register/IRegisterDTO';
import { IUserRepository } from '@domain/repositories/IUserRepository';
import { v4 as uuidv4 } from 'uuid';

export class IUserRepositoryInMemoryImpl implements IUserRepository {
  constructor(
    private readonly users: User[]
  ) {}

  async findUserByEmail({
    email
  }: Pick<User, 'email'>): Promise<User | null> {
    return new Promise((resolve, reject) => {
      const user: User | undefined = this.users.find(
        (user) => user.email === email
      );

      if (typeof user === 'undefined') return resolve(null);

      return resolve(user);
    });
  }

  async saveUser({
    name,
    surname,
    email,
    password,
  }: IRegisterDTO): Promise<User> {
    return new Promise((resolve, reject) => {
      const user: User = {
        id: this.users.length + 1,
        public_id: uuidv4(),
        name: name,
        surname: surname,
        email: email,
        password: password,
        role: 'Buyer',
        is_email_verified: false,
        created_at: new Date(),
        last_login_at: new Date(),
        email_verified_at: null,
      };

      this.users.push(user);

      resolve(user);
    });
  }

  async findUserById({
    public_id
  }: Pick<User, 'public_id'>): Promise<User | null> {
    return new Promise((resolve, reject) => {
      const user: User | undefined = this.users.find(
        (user) => user.public_id === public_id
      );

      if (typeof user === 'undefined') return resolve(null);

      return resolve(user);
    });
  }

  async trackUserActivity({ 
    email
   }: Pick<User, 'email'>): Promise<void> {
    return new Promise((resolve, reject) => {
      const user = this.users.find((user: User) => user.email === email);
      if (user) user.last_login_at = new Date();
      resolve()
    });
  }
}
