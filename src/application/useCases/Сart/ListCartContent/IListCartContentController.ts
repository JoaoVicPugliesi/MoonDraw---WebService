import { RequestResponseAdapter } from '@adapters/ServerAdapter';
import { IListCartContentUseCase } from './IListCartContentUseCase';
import { IEnsureAccessTokenMiddleware } from '@application/middlewares/IEnsureAccessTokenMiddleware';
import { ITokenService } from '@domain/services/ITokenService';
import { IListCartContentDTO } from './IListCartContentDTO';
import {
  IListCartContentResponse,
  InvalidCartEmptyErrorResponse,
} from '@application/handlers/UseCasesResponses/Cart/IListCartContentHandlers';

export class IListCartContentController {
  constructor(
    private readonly iListCartContentUseCase: IListCartContentUseCase,
    private readonly iTokenService: ITokenService
  ) {}

  async handle(adapter: RequestResponseAdapter) {
    try {
      const iEnsureAccessTokenMiddleware = new IEnsureAccessTokenMiddleware(
        adapter,
        this.iTokenService
      );
      iEnsureAccessTokenMiddleware.ensure();

      const { public_id }: IListCartContentDTO = adapter.req
        .query as IListCartContentDTO;

      const response: InvalidCartEmptyErrorResponse | IListCartContentResponse =
        await this.iListCartContentUseCase.execute({
          public_id,
        });

      if (response instanceof InvalidCartEmptyErrorResponse) {
        return adapter.res.status(404).send({ message: 'Cart is Empty' });
      }

      return adapter.res.status(200).send({ content: response.content });
    } catch (error) {
      return adapter.res.status(500).send({ message: error });
    }
  }
}
