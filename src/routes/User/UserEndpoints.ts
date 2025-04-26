import { iLogin } from '@application/useCases/User/Login/ILoginComposer';
import { iRegister } from '@application/useCases/User/Register/IRegisterComposer';
import { iLogout } from '@application/useCases/User/Logout/ILogoutComposer';
import { iConfirmMail } from '@application/useCases/User/ConfirmMail/IConfirmMailComposer';
import { RequestResponseAdapter, ServerAdapter } from '@adapters/ServerAdapter';
import { IUserValidator } from '@application/validators/User/IUserValidator';
import z from 'zod';


export class UserEndpoints {
  constructor(
    private readonly app: ServerAdapter,
    private readonly iUserValidator: IUserValidator
  ) {}

  setupRoutes() {
    this.app.post('/api/users/register', {
      schema: {
        description: 'IRegisterUseCase',
        body: this.iUserValidator.validateRegister(),
        tags: ['Users'],
        response: {
            201: z.object({
              message: z.string(),
              current_user: z.object({
                access_token: z.string(),
                user: z.object({
                  name: z.string(),
                  surname: z.string(),
                  email: z.string(),
                  role: z.string(),
                  is_verified: z.boolean()
                }),
                cart: z.object({
                  id: z.number(),
                  public_id: z.string(),
                  user_id: z.string()
                })
              })
            }).describe('User Created Successfully')
          }
      },
    }, async (adapter: RequestResponseAdapter) => {
      await iRegister.handle(adapter);
    });

    this.app.post('/api/users/login', {
      schema: {
        description: 'ILoginUseCase',
        body: this.iUserValidator.validateLogin(),
        tags: ['Users']
      }
    }, async (adapter: RequestResponseAdapter) => {
      await iLogin.handle(adapter);
    });

    this.app.post('/api/logout', {
      schema: {
        tags: ['Users']
      }
    },async(adapter: RequestResponseAdapter) => {
      await iLogout.handle(adapter);
    });

    this.app.put('/api/users/confirmMail', {
      schema: {
        body: this.iUserValidator.validateConfirmMail(),
        tags: ['Users']
      }
    },async (adapter: RequestResponseAdapter) => {
      await iConfirmMail.handle(adapter);
    });
  }
}
