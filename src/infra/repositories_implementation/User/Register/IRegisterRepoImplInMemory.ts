import { User } from '@domain/entities/User';
import { IRegisterDTO } from '@application/useCases/User/Register/IRegisterDTO';
import { IRegisterRepo } from '@domain/repositories/User/IRegisterRepo';
import { IHashService } from '@domain/services/IHashService';
import { randomUUID } from 'crypto';

export class IRegisterRepoImplInMemory implements IRegisterRepo {
  constructor(private readonly users: User[]) {}

  async findUser<T>(param: T): Promise<boolean> {
    return new Promise((resolve, reject) => {
      const isUser = this.users.find(
        (user) => user.email === (param as string)
      );

      if (isUser) {
        resolve(true);
      }

      resolve(false);
    });
  }

  async save(
    { name, surname, email, password }: IRegisterDTO,
    iHashService: IHashService
  ): Promise<User> {
    const hash: string = await iHashService.hash(password);
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
      }
      
      this.users.push(user);

      resolve(user);
    });
  }
}
