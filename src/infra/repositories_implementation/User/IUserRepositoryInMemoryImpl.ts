import { User } from '@domain/entities/User';
import { IRegisterDTO } from '@application/useCases/User/Register/IRegisterDTO';
import { IUserRepository } from '@domain/repositories/IUserRepository';
import { IHashService } from '@domain/services/IHashService';
import { randomUUID } from 'crypto';

export class IUserRepositoryInMemoryImpl implements IUserRepository {
  constructor(
    private readonly users: User[],
    private readonly iHashService: IHashService
  ) {}

  async findUserByEmail(email: string): Promise<User | null> {
    return new Promise((resolve, reject) => {
      const user: User | undefined = this.users.find(
        (user) => user.email === (email)
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
    const hash: string = await this.iHashService.hash(password);
    return new Promise((resolve, reject) => {
      const user: User = {
        id: this.users.length + 1,
        public_id: randomUUID(),
        name: name,
        surname: surname,
        email: email,
        password: hash,
        role: 'client',
        is_active: false,
        created_at: new Date(),
        email_verified_at: null,
      };

      this.users.push(user);

      resolve(user);
    });
  }

  async findUserById(public_id: string): Promise<User | null> {
    return new Promise((resolve, reject) => {
      const user: User | undefined = this.users.find(
        (user) => user.public_id === (public_id)
      );

      if (typeof user === 'undefined') return resolve(null);

      return resolve(user);
    });
  }

  async activateUser<T>(param: T): Promise<void> {
    return new Promise((resolve, reject) => {
      const user: User | undefined = this.users.find(
        (user) => user.email === (param as string)
      );

      if (user) {
        user.is_active = true;
        user.email_verified_at = new Date();
        resolve();
      }

      resolve();
    });
  }
}
