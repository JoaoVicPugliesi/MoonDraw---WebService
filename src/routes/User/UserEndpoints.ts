import { iLogin } from '@application/useCases/User/Login/ILoginComposer';
import { iRegister } from '@application/useCases/User/Register/IRegisterComposer';
import { iLogout } from '@application/useCases/User/Logout/ILogoutComposer';
import { iConfirmMail } from '@application/useCases/User/ConfirmMail/IConfirmMailComposer';
import { RequestResponseAdapter, ServerAdapter } from '@adapters/ServerAdapter';

export class UserEndpoints {
  constructor(
    private readonly app: ServerAdapter
  ) {}

  setupRoutes() {
    this.app.post('/api/users/register', async (adapter: RequestResponseAdapter) => {
      await iRegister.handle(adapter);
    });

    this.app.post('/api/users/login', async (adapter: RequestResponseAdapter) => {
      await iLogin.handle(adapter);
    });

    this.app.post('/api/logout', async(adapter: RequestResponseAdapter) => {
      await iLogout.handle(adapter);
    });

    this.app.put('/api/users/confirmMail', async (adapter: RequestResponseAdapter) => {
      await iConfirmMail.handle(adapter);
    });
  }
}
