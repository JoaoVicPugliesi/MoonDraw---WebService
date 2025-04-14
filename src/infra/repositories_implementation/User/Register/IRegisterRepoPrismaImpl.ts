import { User } from '../../../../domain/entities/User';
import { prisma } from '../../../db/Prisma';
import { randomUUID } from 'crypto';
import { IRegisterDTO } from '@application/useCases/User/Register/IRegisterDTO';
import { IRegisterRepo } from '@domain/repositories/User/IRegisterRepo';
import { IHashService } from '@domain/services/IHashService';

export class IRegisterRepoPrismaImpl implements IRegisterRepo {

  constructor(
    private readonly iHashService: IHashService
  ) {}

  async findUser<T>(param: T): Promise<boolean> {
    const isUser = await prisma.user.findFirst({
      where: {
        email: param as string,
      },
    });

    if (isUser) {
      return true;
    }

    return false;
  }

  async saveUser(
    { name, surname, email, password }: IRegisterDTO,
  ): Promise<User> {
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
}
