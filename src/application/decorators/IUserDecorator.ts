import { IRegisterDTO } from '@application/useCases/User/Register/IRegisterDTO';
import { User } from '@domain/entities/User';
import { IUserRepository } from '@domain/repositories/IUserRepository';
import { IUserRepositoryPrismaImpl } from '@infra/repositories_implementation/User/IUserRepositoryPrismaImpl';
import { IHashServiceBCryptImpl } from '@infra/services_implementation/IHashServiceBCryptImpl';

class IUserDecorator implements IUserRepository {
  constructor(
    private readonly decoratee: IUserRepository
  ) {}

  async findUser<T>(param: T): Promise<User | null> {
    return await this.decoratee.findUser(param);
  }

  async saveUser({
    name,
    surname,
    email,
    password,
  }: IRegisterDTO): Promise<User> {
    return await this.decoratee.saveUser({
      name,
      surname,
      email,
      password,
    });
  }

  async findRefreshTokenUser<T>(param: T): Promise<User | null> {
    return await this.decoratee.findRefreshTokenUser(param);
  }

  async activateUser<T>(param: T): Promise<void> {
    return await this.decoratee.activateUser(param);
  }
}

const iHashService = new IHashServiceBCryptImpl();
const decoratee = new IUserRepositoryPrismaImpl(iHashService);
const iUserDecorator = new IUserDecorator(decoratee);

export { iUserDecorator };