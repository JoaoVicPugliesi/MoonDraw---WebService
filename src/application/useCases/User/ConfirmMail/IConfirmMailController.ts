import z from 'zod';
import { IConfirmMailUseCase } from './IConfirmMailUseCase';
import { IConfirmMailDTO, TokenExpiredErrorResponse } from './IConfirmMailDTO';
import { IEnsureMiddleware } from '@application/middlewares/IEnsureMiddleware';
import { IUserValidator } from '@application/validators/Request/User/IUserValidator';
import { RequestResponseAdapter } from '@adapters/RequestResponseAdapter';

export class IConfirmMailController {
  constructor(
    private readonly iConfirmMailUseCase: IConfirmMailUseCase,
    private readonly iUserValidator: IUserValidator,
    private readonly iEnsureMiddleware: IEnsureMiddleware
  ) {}

  async handle(adapter: RequestResponseAdapter) {
    const schema = this.iUserValidator.validateConfirmMail();
    try {
      const {
        token
      }: IConfirmMailDTO = schema.parse(adapter.req.body);
      const response: TokenExpiredErrorResponse | void =
        await this.iConfirmMailUseCase.execute({
          token
        });

      if (response instanceof TokenExpiredErrorResponse) {
        return adapter.res.status(401).send({ 
          message: 'Token Expired' 
        }); 
      }

      return adapter.res.status(201).send({
        message: 'User Saved 🚀'
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        return adapter.res.status(422).send({
          message: 'Validation Error',
          errors: error.flatten().fieldErrors,
        });
      }

      return adapter.res.status(500).send({ message: 'Server internal error' });
    }
  }
}
