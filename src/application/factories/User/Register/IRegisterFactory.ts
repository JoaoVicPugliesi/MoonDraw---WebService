import { INodemailerMailProviderImpl } from '@infra/providers_implementation/Mail/INodeMailerMailProviderImplementation';
import { ILoginFactory } from '@application/factories/User/Login/ILoginFactory';
import { IRegisterUseCase } from '@application/useCases/User/Register/IRegisterUseCase';
import { iUserDecorator } from '@application/decorators/IUserDecorator';

export class IRegisterFactory {
  compose(): IRegisterUseCase {
    const iMailProvider = new INodemailerMailProviderImpl();
    const iLoginFactory = new ILoginFactory();
    const iLoginUseCase = iLoginFactory.compose();
    
    return new IRegisterUseCase(
      iUserDecorator,
      iMailProvider,
      iLoginUseCase
    );;
  }
}
