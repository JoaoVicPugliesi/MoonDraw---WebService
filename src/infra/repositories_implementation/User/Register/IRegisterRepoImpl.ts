import { User } from './../../../../domain/entities/User';
import { prisma } from './../../../db/Prisma';
import { randomUUID } from 'crypto';
import { IRegisterDTO } from '@application/useCases/User/Register/IRegisterDTO';
import { IRegisterRepo } from '@domain/repositories/User/IRegisterRepo';
import { IHashService } from '@domain/services/IHashService';

export class IRegisterRepoImpl implements IRegisterRepo {
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

  async save(
    { name, surname, email, password }: IRegisterDTO,
    iHashService: IHashService
  ): Promise<User> {
    const hash: string = await iHashService.hash(password);
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
