import { INodemailerMailProviderImpl } from '@infra/providers_implementation/Mail/INodeMailerMailProviderImplementation';
import { IBcryptHashServiceImpl } from '@infra/services_implementation/IBcryptHashServiceImpl';
import { IRegisterRepoImpl } from '@infra/repositories_implementation/User/Register/IRegisterRepoImpl';
import { IRegisterUseCase } from '@application/useCases/User/Register/IRegisterUseCase';
import { ILoginFactory } from '../Login/ILoginFactory';

export class IRegisterFactory {
  compose(): IRegisterUseCase {
    const iMailProvider = new INodemailerMailProviderImpl();
    const iHashService = new IBcryptHashServiceImpl();
    const iLoginFactory = new ILoginFactory();
    const iLoginUseCase = iLoginFactory.compose();
    const iRegisterRepo = new IRegisterRepoImpl(iHashService);
    const iRegisterUseCase = new IRegisterUseCase(
      iRegisterRepo,
      iMailProvider,
      iLoginUseCase
    );
    
    return iRegisterUseCase;
  }
}
