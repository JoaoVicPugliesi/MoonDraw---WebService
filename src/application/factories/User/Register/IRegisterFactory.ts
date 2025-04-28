import { IRegisterUseCase } from '@application/useCases/User/Register/IRegisterUseCase';
import { iUserDecorator } from '@application/decorators/IUserDecorator';
import { ICacheProviderRedisImpl } from '@infra/providers/Cache/ICacheProviderRedisImpl';
import { IHashServiceBCryptImpl } from '@infra/services/IHashServiceBCryptImpl';
import { IIdServiceUUIDNanoIdImpl } from '@infra/services/IIdServiceUUIDNanoIdImpl';
import { IMailProviderMailTrapImpl } from '@infra/providers/Mail/IMailProviderMailTrapImpl';

export class IRegisterFactory {
  compose(): IRegisterUseCase {
    const iCacheProvider = new ICacheProviderRedisImpl();
    const iMailProvider = new IMailProviderMailTrapImpl();
    const iHashService = new IHashServiceBCryptImpl();
    const iIdService = new IIdServiceUUIDNanoIdImpl();

    return new IRegisterUseCase(
      iUserDecorator,
      iCacheProvider,
      iMailProvider,
      iHashService,
      iIdService
    );;
  }
}
