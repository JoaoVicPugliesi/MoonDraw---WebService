import { User } from "@domain/entities/User";
import { IRegisterDTO } from "@application/useCases/User/Register/IRegisterDTO";

export interface IUserRepository {
  findUser<T>(param: T): Promise<User | null>;
  saveUser(DTO: IRegisterDTO): Promise<User>;
  findRefreshTokenUser<T>(param: T): Promise<User | null>;
  activateUser<T>(param: T): Promise<void>;
}
