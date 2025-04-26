import { iLogin } from '@application/useCases/User/Login/ILoginComposer';
import { iRegister } from '@application/useCases/User/Register/IRegisterComposer';
import { iLogout } from '@application/useCases/User/Logout/ILogoutComposer';
import { iConfirmMail } from '@application/useCases/User/ConfirmMail/IConfirmMailComposer';
import { RequestResponseAdapter, ServerAdapter } from '@adapters/ServerAdapter';
import { IUserDocs } from './docs/IUserDocs';

export class UserEndpoints {
  constructor(
    private readonly app: ServerAdapter,
    private readonly iUserDocs: IUserDocs
  ) {}

  setupRoutes() {
    this.app.post(
      '/api/users/register',
      this.iUserDocs.registerDocs(),
      async (adapter: RequestResponseAdapter) => {
        await iRegister.handle(adapter);
      }
    );

    this.app.post(
      '/api/users/login',
      this.iUserDocs.loginDocs(),
      async (adapter: RequestResponseAdapter) => {
        await iLogin.handle(adapter);
      }
    );

    this.app.post(
      '/api/users/logout',
      this.iUserDocs.logoutDocs(),
      async (adapter: RequestResponseAdapter) => {
        await iLogout.handle(adapter);
      }
    );

    this.app.put(
      '/api/users/confirmMail',
      this.iUserDocs.confirMailDocs(),
      async (adapter: RequestResponseAdapter) => {
        await iConfirmMail.handle(adapter);
      }
    );
  }
}
