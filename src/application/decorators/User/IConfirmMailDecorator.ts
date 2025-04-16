import { IConfirmMailRepo } from '@domain/repositories/User/IConfirmMailRepo';
import { IConfirmMailRepoPrismaImpl } from '@infra/repositories_implementation/User/ConfirmMail/IConfirmMailRepoPrismaImpl';

export class IConfirmMailDecorator implements IConfirmMailRepo {
    constructor(
        private readonly decoratee: IConfirmMailRepo
    ) {}

    async findUser<T>(param: T): Promise<boolean> {
        return await this.decoratee.findUser(param)
    }

    async activateUser<T>(param: T): Promise<void> {
        return await this.decoratee.activateUser(param);
    }
}

const iConfirmMailRepoPrisma = new IConfirmMailRepoPrismaImpl();
const iConfirmMailDecorator = new IConfirmMailDecorator(iConfirmMailRepoPrisma);

export { iConfirmMailDecorator };