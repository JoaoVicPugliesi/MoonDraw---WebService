import { IConfirmMailRepoImpl } from '@infra/repositories_implementation/User/ConfirmMail/IConfirmMailRepoImpl';
import { IConfirmMailUseCase } from '@application/useCases/User/ConfirmMail/IConfirmMailUseCase';

export class IConfirmMailFactory {
  compose(): IConfirmMailUseCase {
    const iConfirmMailRepo = new IConfirmMailRepoImpl();
    const iConfirmMailUseCase = new IConfirmMailUseCase(iConfirmMailRepo);

    return iConfirmMailUseCase;
  }
}
