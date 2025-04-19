import { iUserDecorator } from '@application/decorators/IUserDecorator';
import { IConfirmMailUseCase } from '@application/useCases/User/ConfirmMail/IConfirmMailUseCase';

export class IConfirmMailFactory {
  compose(): IConfirmMailUseCase {
    return new IConfirmMailUseCase(iUserDecorator);
  }
}
