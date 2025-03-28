import { randomUUID } from "crypto";
import { ICreateUserDTO } from "../../../application/useCases/User/CreateUser/ICreateUserDTO";
import { User } from "../../../domain/entities/User";
import { ICreateUserRepo } from "../../../domain/repositories/User/ICreateUserRepo";
import { prisma } from "../../db/Prisma";
import { IHashService } from "../../../domain/services/IHashService";

export class ICreateUserRepoImpl implements ICreateUserRepo {
  async findUser<T>(param: T): Promise<boolean> {
    const isUser = await prisma.user.findUnique({
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
    { name, surname, email, password }: ICreateUserDTO,
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
