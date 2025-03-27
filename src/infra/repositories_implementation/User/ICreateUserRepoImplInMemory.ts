import { User } from "../../../domain/entities/User";
import { randomUUID } from "crypto";
import { ICreateUserDTO } from "../../../application/useCases/User/CreateUser/ICreateUserDTO";
import { ICreateUserRepo } from "../../../domain/repositories/User/ICreateUserRepo";
import { IBCryptService } from "../../../domain/services/IBCryptService";

export class ICreateUserRepoImplInMemory implements ICreateUserRepo {
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
    { name, surname, email, password }: ICreateUserDTO,
    iBCryptService: IBCryptService
  ): Promise<User> {
    const hash: string = await iBCryptService.hash(password);
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
