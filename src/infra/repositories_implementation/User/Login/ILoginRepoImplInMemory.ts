import { User } from "@domain/entities/User";
import { ILoginRepo } from "@domain/repositories/User/ILoginRepo";

export class ILoginRepoImplInMemory implements ILoginRepo {

    constructor(private readonly users: User[]) {}

    findUser<T>(param: T): Promise<User | null> {
        return new Promise((resolve, reject) => {
            const user : User | undefined = this.users.find((user) => user.email === param as string);

            if(user) resolve(user);

            resolve(null);
        });
    }
}