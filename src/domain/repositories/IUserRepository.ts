import { User } from '@domain/entities/User';
import { IRegisterDTO } from '@application/useCases/User/Register/IRegisterDTO';

export interface IUserRepository {
  findUserByEmail(DTO: Pick<User, 'email'>): Promise<User | null>;
  saveUser(DTO: IRegisterDTO): Promise<User>;
  findUserById(DTO: Pick<User, 'public_id'>): Promise<User | null>;
  trackUserActivity(DTO: Pick<User, 'email'>): Promise<void>;
}
