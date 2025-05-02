import { iLogin } from '@application/useCases/User/Login/ILoginComposer';
import { iRegister } from '@application/useCases/User/Register/IRegisterComposer';
import { iLogout } from '@application/useCases/User/Logout/ILogoutComposer';
import { iConfirmMail } from '@application/useCases/User/ConfirmMail/IConfirmMailComposer';
import { ServerAdapter } from '@adapters/ServerAdapter';
import { IUserDocs } from './docs/IUserDocs';
import { IUserConfigs } from './config/IUserConfigs';
import { RequestResponseAdapter } from '@adapters/RequestResponseAdapter';
import { iResendVerificationToken } from '@application/useCases/User/ResendVerificationToken/IResendVerificationTokenComposer';

export class UserEndpoints {
  constructor(
    private readonly app: ServerAdapter,
    private readonly iUserDocs: IUserDocs,
    private readonly iUserConfigs: IUserConfigs
  ) {}

  setupRoutes() {
    this.app.post(
      '/users/register',
      async (adapter: RequestResponseAdapter) => {
        await iRegister.handle(adapter);
      },
      {
        docs: this.iUserDocs.registerDoc(),
        config: this.iUserConfigs.registerConfig()
      }
    );
    
    this.app.post(
      '/users/confirmMail',
      async (adapter: RequestResponseAdapter) => {
        await iConfirmMail.handle(adapter);
      },
      {
        docs: this.iUserDocs.confirmMailDoc(),
      },
    );
    this.app.post(
      '/users/resendVerificationToken',
      async (adapter: RequestResponseAdapter) => {
        await iResendVerificationToken.handle(adapter);
      },
      {
        docs: this.iUserDocs.resendVerificationToken()
      }
    );

    this.app.post(
      '/users/login', 
      async (adapter: RequestResponseAdapter) => {
        await iLogin.handle(adapter);
      },
      {
        docs: this.iUserDocs.loginDoc(),
        config: this.iUserConfigs.loginConfig()
      },
    );

    this.app.post(
      '/users/logout',
      async (adapter: RequestResponseAdapter) => {
        await iLogout.handle(adapter);
      },
      {
        docs: this.iUserDocs.logoutDoc(),
      },
    );

  }
}
