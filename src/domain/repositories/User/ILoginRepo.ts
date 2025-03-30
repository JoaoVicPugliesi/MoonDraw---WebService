import { User } from '@domain/entities/User';

export interface ILoginRepo {
    findUser<T>(param: T): Promise<User | null>;
}