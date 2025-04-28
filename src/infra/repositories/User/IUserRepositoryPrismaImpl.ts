import { User } from '@domain/entities/User';
import { prisma } from '@infra/db/Prisma';
import { v4 as uuidv4 } from 'uuid';
import { IRegisterDTO } from '@application/useCases/User/Register/IRegisterDTO';
import { IUserRepository } from '@domain/repositories/IUserRepository';

export class IUserRepositoryPrismaImpl implements IUserRepository {

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
    const user: User = await prisma.user.create({
      data: {
        public_id: uuidv4(),
        name: name,
        surname: surname,
        email: email,
        password: password,
        is_verified: true,
        email_verified_at: new Date()
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
}
