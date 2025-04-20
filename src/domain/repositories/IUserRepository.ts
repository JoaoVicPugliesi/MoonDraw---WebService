import { User } from "@domain/entities/User";
import { IRegisterDTO } from "@application/useCases/User/Register/IRegisterDTO";

export interface IUserRepository {
  findUserByEmail(email: string): Promise<User | null>;
  saveUser(DTO: IRegisterDTO): Promise<User>;
  findUserById(public_id: string): Promise<User | null>;
  activateUser<T>(param: T): Promise<void>;
}
