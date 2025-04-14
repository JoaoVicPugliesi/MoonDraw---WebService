import { User } from '@domain/entities/User';
import { IConfirmMailRepo } from '@domain/repositories/User/IConfirmMailRepo';

export class IConfirmMailRepoInMemoryImpl implements IConfirmMailRepo {
  constructor(private readonly users: User[]) {}

  async findUser<T>(param: T): Promise<boolean> {
    return new Promise((resolve, reject) => {
      const user: User | undefined = this.users.find(
        (user) => user.email === (param as string)
      );

      if (user) resolve(true);

      resolve(false);
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
