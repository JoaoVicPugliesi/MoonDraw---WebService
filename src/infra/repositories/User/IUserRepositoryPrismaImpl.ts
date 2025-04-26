import { User } from '@domain/entities/User';
import { prisma } from '@infra/db/Prisma';
import { randomUUID } from 'crypto';
import { IRegisterDTO } from '@application/useCases/User/Register/IRegisterDTO';
import { IUserRepository } from '@domain/repositories/IUserRepository';
import { IHashService } from '@domain/services/Hash/IHashService';

export class IUserRepositoryPrismaImpl implements IUserRepository {
  constructor(private readonly iHashService: IHashService) {}

  async findUserByEmail({
    email
  }: Pick<User, 'email'>): Promise<User | null> {
    const user: User | null = await prisma.user.findFirst({
      where: {
        email: email,
      },
    });

    return user;
  }

  async saveUser({
    name,
    surname,
    email,
    password,
  }: IRegisterDTO): Promise<User> {
    const hash: string = await this.iHashService.hash(password);
    const user: User = await prisma.user.create({
      data: {
        public_id: randomUUID(),
        name: name,
        surname: surname,
        email: email,
        password: hash,
      },
    });

    return user;
  }

  async findUserById({ 
    public_id
   }: Pick<User, 'public_id'>): Promise<User | null> {
    const user: User | null = await prisma.user.findFirst({
      where: {
        public_id: public_id,
      },
    });

    if (user) return user;

    return null;
  }

  async trackUserActivity({
    email
  }: Pick<User, 'email'>): Promise<void> {
    await prisma.user.update({
      where: {
        email: email,
      },
      data: {
        last_login_at: new Date(),
      },
    });
  }
  async verifyUser<T>(param: T): Promise<void> {
    await prisma.user.update({
      where: {
        email: param as string,
      },
      data: {
        is_verified: true,
        email_verified_at: new Date(),
      },
    });
  }
}
