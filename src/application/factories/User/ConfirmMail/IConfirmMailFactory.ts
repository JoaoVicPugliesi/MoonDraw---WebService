import { iCartDecorator } from '@application/decorators/ICartDecorator';
import { iUserDecorator } from '@application/decorators/IUserDecorator';
import { IConfirmMailUseCase } from '@application/useCases/User/ConfirmMail/IConfirmMailUseCase';
import { ICacheProviderRedisImpl } from '@infra/providers/Cache/ICacheProviderRedisImpl';

export class IConfirmMailFactory {
  compose(): IConfirmMailUseCase {
    const iCacheProvider = new ICacheProviderRedisImpl();
    return new IConfirmMailUseCase(iUserDecorator, iCartDecorator, iCacheProvider);
  }
}
