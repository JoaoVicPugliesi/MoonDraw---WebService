import { IRegisterUseCase } from '@application/useCases/User/Register/IRegisterUseCase';
import { iUserDecorator } from '@application/decorators/IUserDecorator';
import { IMailProviderGmailImpl } from '@infra/providers/Mail/IMailProviderGmailImpl';
import { ICacheProviderRedisImpl } from '@infra/providers/Cache/ICacheProviderRedisImpl';
import { IHashServiceBCryptImpl } from '@infra/services/IHashServiceBCryptImpl';

export class IRegisterFactory {
  compose(): IRegisterUseCase {
    const iCacheProvider = new ICacheProviderRedisImpl();
    const iMailProvider = new IMailProviderGmailImpl();
    const iHashService = new IHashServiceBCryptImpl();

    return new IRegisterUseCase(
      iUserDecorator,
      iCacheProvider,
      iMailProvider,
      iHashService
    );;
  }
}
