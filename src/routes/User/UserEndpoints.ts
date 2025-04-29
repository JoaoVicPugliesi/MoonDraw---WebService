import { iLogin } from '@application/useCases/User/Login/ILoginComposer';
import { iRegister } from '@application/useCases/User/Register/IRegisterComposer';
import { iLogout } from '@application/useCases/User/Logout/ILogoutComposer';
import { iConfirmMail } from '@application/useCases/User/ConfirmMail/IConfirmMailComposer';
import { RequestResponseAdapter, ServerAdapter } from '@adapters/ServerAdapter';
import { IUserDocs } from './docs/IUserDocs';
import { IUserConfigs } from './config/IUserConfigs';

export class UserEndpoints {
  constructor(
    private readonly app: ServerAdapter,
    private readonly iUserDocs: IUserDocs,
    private readonly iUserConfigs: IUserConfigs
  ) {}

  setupRoutes() {
    this.app.post(
      '/users/register',
      {
        docs: {
          ...this.iUserDocs.registerDoc()
        },
        config: this.iUserConfigs.registerConfig()
      },
      async (adapter: RequestResponseAdapter) => {
        await iRegister.handle(adapter);
      }
    );

    this.app.post(
      '/users/login', 
      {
        docs: this.iUserDocs.loginDoc(),
        config: this.iUserConfigs.loginConfig()
      },
      async (adapter: RequestResponseAdapter) => {
        await iLogin.handle(adapter);
      }
    );

    this.app.post(
      '/users/logout',
      {
        docs: this.iUserDocs.logoutDoc(),
      },
      async (adapter: RequestResponseAdapter) => {
        await iLogout.handle(adapter);
      }
    );

    this.app.post(
      '/users/confirmMail',
      {
        docs: this.iUserDocs.confirmMailDoc(),
      },
      async (adapter: RequestResponseAdapter) => {
        await iConfirmMail.handle(adapter);
      }
    );
  }
}
