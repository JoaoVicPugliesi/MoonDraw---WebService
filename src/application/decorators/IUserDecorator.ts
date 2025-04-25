import { IRegisterDTO } from '@application/useCases/User/Register/IRegisterDTO';
import { User } from '@domain/entities/User';
import { IUserRepository } from '@domain/repositories/IUserRepository';
import { IUserRepositoryPrismaImpl } from '@infra/repositories_implementation/User/IUserRepositoryPrismaImpl';
import { IHashServiceBCryptImpl } from '@infra/services_implementation/IHashServiceBCryptImpl';

class IUserDecorator implements IUserRepository {
  constructor(
    private readonly decoratee: IUserRepository
  ) {}

  async findUserByEmail({
    email
  }: Pick<User, 'email'>): Promise<User | null> {
    return await this.decoratee.findUserByEmail({
      email
    });
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

  async findUserById({ 
    public_id
  }: Pick<User, 'public_id'>): Promise<User | null> {
    return await this.decoratee.findUserById({
      public_id
    });
  }

  async trackUserActivity({
    email
  }: Pick<User, 'email'>): Promise<void> {
      await this.decoratee.trackUserActivity({
        email
      });
  }

  async verifyUser<T>(param: T): Promise<void> {
    return await this.decoratee.verifyUser(param);
  }
}

const iHashService = new IHashServiceBCryptImpl();
const decoratee = new IUserRepositoryPrismaImpl(iHashService);
const iUserDecorator = new IUserDecorator(decoratee);

export { iUserDecorator };