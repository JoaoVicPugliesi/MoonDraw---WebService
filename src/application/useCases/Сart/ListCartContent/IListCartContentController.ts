import { RequestResponseAdapter } from '@adapters/ServerAdapter';
import { IListCartContentUseCase } from './IListCartContentUseCase';
import { ITokenService } from '@domain/services/ITokenService';
import { IListCartContentDTO } from './IListCartContentDTO';
import {
  IListCartContentResponse,
  CartEmptyErrorResponse,
} from '@application/handlers/UseCasesResponses/Cart/IListCartContentHandlers';
import {
  TokenInvalidErrorResponse,
  TokenIsMissingErrorResponse,
} from '@application/handlers/MiddlewareResponses/MiddlewareHandlers';
import { IEnsureMiddleware } from '@application/middlewares/IEnsureMiddleware';

export class IListCartContentController {
  constructor(
    private readonly iListCartContentUseCase: IListCartContentUseCase,
    private readonly iTokenService: ITokenService,
    private readonly iEnsureMiddleware: IEnsureMiddleware
  ) {}

  async handle(adapter: RequestResponseAdapter) {
    const ensure:
      | TokenIsMissingErrorResponse
      | TokenInvalidErrorResponse
      | void = this.iEnsureMiddleware.ensureAccessToken(
      adapter,
      this.iTokenService,
      process.env.JWT_SECRET_KEY!
    );

    if (ensure instanceof TokenIsMissingErrorResponse) {
      return adapter.res.status(401).send({ message: 'Token is missing' });
    }
    if (ensure instanceof TokenInvalidErrorResponse) {
      return adapter.res.status(401).send({ message: 'Token is invalid' });
    }
    try {
      const { public_id }: IListCartContentDTO = adapter.req
        .query as IListCartContentDTO;

      const response: CartEmptyErrorResponse | IListCartContentResponse =
        await this.iListCartContentUseCase.execute({
          public_id,
        });

      if (response instanceof CartEmptyErrorResponse) {
        return adapter.res.status(404).send({ message: 'Cart is Empty' });
      }

      return adapter.res.status(200).send({ content: response.content });
    } catch (error) {
      return adapter.res.status(500).send({ message: error });
    }
  }
}
