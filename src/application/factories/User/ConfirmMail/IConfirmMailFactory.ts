import { iUserDecorator } from '@application/decorators/IUserDecorator';
import { IAssignCartOwnerFactory } from '@application/factories/Cart/AssignCartOwner/IAssignCartOwnerFactory';
import { IConfirmMailUseCase } from '@application/useCases/User/ConfirmMail/IConfirmMailUseCase';
import { ICacheProviderRedisImpl } from '@infra/providers/Cache/ICacheProviderRedisImpl';

export class IConfirmMailFactory {
  compose(): IConfirmMailUseCase {
    const iCacheProvider = new ICacheProviderRedisImpl();
    const iAssignCartOwnerFactory = new IAssignCartOwnerFactory();
    const iAssignCartOwnerUseCase = iAssignCartOwnerFactory.compose();
    return new IConfirmMailUseCase(iUserDecorator, iAssignCartOwnerUseCase, iCacheProvider);
  }
}
