import { IRegisterDTO } from '@application/useCases/User/Register/IRegisterDTO';
import { User } from '@domain/entities/User';
import { IRegisterRepo } from '@domain/repositories/User/IRegisterRepo';
import { IRegisterRepoPrismaImpl } from '@infra/repositories_implementation/User/Register/IRegisterRepoPrismaImpl';
import { IHashServiceBCryptImpl } from '@infra/services_implementation/IHashServiceBcryptImpl';

export class IRegisterDecorator implements IRegisterRepo {
    constructor(
        private readonly decoratee: IRegisterRepo
    ) {}

    async findUser<T>(param: T): Promise<boolean> {
        return await this.decoratee.findUser(param);
    }

    async saveUser(DTO: IRegisterDTO): Promise<User> {
        return await this.decoratee.saveUser(DTO)
    }
}

const iHashService = new IHashServiceBCryptImpl();
const iRegisterRepoPrisma = new IRegisterRepoPrismaImpl(iHashService);
const iRegisterDecorator = new IRegisterDecorator(iRegisterRepoPrisma);

export { iRegisterDecorator };