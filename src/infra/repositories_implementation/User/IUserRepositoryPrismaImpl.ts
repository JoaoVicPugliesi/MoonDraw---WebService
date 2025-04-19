import { User } from '@domain/entities/User';
import { prisma } from '@infra/db/Prisma';
import { randomUUID } from 'crypto';
import { IRegisterDTO } from '@application/useCases/User/Register/IRegisterDTO';
import { IUserRepository } from '@domain/repositories/IUserRepository';
import { IHashService } from '@domain/services/IHashService';

export class IUserRepositoryPrismaImpl implements IUserRepository {
  constructor(
    private readonly iHashService: IHashService
  ) {}

  async findUser<T>(param: T): Promise<User | null> {
    const user: User | null = await prisma.user.findFirst({
      where: {
        email: param as any,
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

  async findRefreshTokenUser<T>(param: T): Promise<User | null> {
    const user: User | null = await prisma.user.findFirst({
      where: {
        public_id: param as any,
      },
    });

    if (user) return user;

    return null;
  }

  async activateUser<T>(param: T): Promise<void> {
    await prisma.user.update({
      where: {
        email: param as any,
      },
      data: {
        is_active: true,
        email_verified_at: new Date(),
      },
    });
  }
}
