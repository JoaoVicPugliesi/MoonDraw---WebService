import { User } from '@domain/entities/User';
import { ILoginRepo } from '@domain/repositories/User/ILoginRepo';
import { ILoginRepoPrismaImpl } from '@infra/repositories_implementation/User/Login/ILoginRepoPrismaImpl';

export class ILoginDecorator implements ILoginRepo {
    constructor(
        private readonly decoratee: ILoginRepo
    ) {}

    async findUser<T>(param: T): Promise<User | null> {
        return await this.decoratee.findUser(param);
    }
}

const decoratee = new ILoginRepoPrismaImpl();
const iLoginDecorator = new ILoginDecorator(decoratee);

export { iLoginDecorator };