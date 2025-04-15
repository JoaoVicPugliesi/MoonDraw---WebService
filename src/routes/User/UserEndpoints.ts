import { login } from '@application/useCases/User/Login/ILoginComposer';
import { register } from '@application/useCases/User/Register/IRegisterComposer';
import { logout } from '@application/useCases/User/Logout/ILogoutComposer';
import { confirmMail } from '@application/useCases/User/ConfirmMail/IConfirmMailComposer';
import { RequestResponseAdapter, ServerAdapter } from '@adapters/ServerAdapter';

export class UserEndpoints {
  constructor(
    private readonly app: ServerAdapter
  ) {}

  setupRoutes() {
    this.app.post('/api/users/register', async (adapter: RequestResponseAdapter) => {
      await register.handle(adapter);
    });

    this.app.post('/api/users/login', async (adapter: RequestResponseAdapter) => {
      await login.handle(adapter);
    });

    this.app.post('/api/logout', async(adapter: RequestResponseAdapter) => {
      await logout.handle(adapter);
    });

    this.app.put('/api/users/confirmMail', async (adapter: RequestResponseAdapter) => {
      await confirmMail.handle(adapter);
    });
  }
}
