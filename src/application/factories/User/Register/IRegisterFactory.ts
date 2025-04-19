import { INodemailerMailProviderImpl } from '@infra/providers_implementation/Mail/INodeMailerMailProviderImplementation';
import { ILoginFactory } from '@application/factories/User/Login/ILoginFactory';
import { IRegisterUseCase } from '@application/useCases/User/Register/IRegisterUseCase';
import { iUserDecorator } from '@application/decorators/IUserDecorator';
import { IAssignCartOwnerFactory } from '@application/factories/Cart/IAssignCartOwner/IAssignCartOwnerFactory';

export class IRegisterFactory {
  compose(): IRegisterUseCase {
    const iMailProvider = new INodemailerMailProviderImpl();
    const iLoginFactory = new ILoginFactory();
    const iLoginUseCase = iLoginFactory.compose();
    const iAssignCartOwnerFactory = new IAssignCartOwnerFactory();
    const iAssignCartOwnerUseCase = iAssignCartOwnerFactory.compose();
    
    return new IRegisterUseCase(
      iUserDecorator,
      iMailProvider,
      iAssignCartOwnerUseCase,
      iLoginUseCase
    );;
  }
}
