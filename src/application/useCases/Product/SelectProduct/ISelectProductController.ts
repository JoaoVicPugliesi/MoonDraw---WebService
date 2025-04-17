import { RequestResponseAdapter } from '@adapters/ServerAdapter';
import { ISelectProductUseCase } from './ISelectProductUseCase';
import { ITokenService } from '@domain/services/ITokenService';
import { IEnsureAccessTokenMiddleware } from '@application/middlewares/IEnsureAccessTokenMiddleware';
import { ISelectProductDTO } from './ISelectProductDTO';
import {
  InvalidProductNotFoundErrorResponse,
  SelectProductResponse,
} from '@application/handlers/UseCasesResponses/Product/ISelectProductHandlers';

export class ISelectProductController {
  constructor(
    private readonly iSelectProductUseCase: ISelectProductUseCase,
    private readonly iTokenService: ITokenService
  ) {}

  async handle(adapter: RequestResponseAdapter) {
    try {
      const iEnsureAccessTokenMiddleware = new IEnsureAccessTokenMiddleware(
        adapter,
        this.iTokenService
      );
      iEnsureAccessTokenMiddleware.ensure();
      const { public_id }: ISelectProductDTO = adapter.req
        .params as ISelectProductDTO;
      const response:
        | SelectProductResponse
        | InvalidProductNotFoundErrorResponse =
        await this.iSelectProductUseCase.execute({
          public_id,
        });

      if (response instanceof InvalidProductNotFoundErrorResponse) {
        return adapter.res.status(404).send({
          message: 'Product Not Found',
        });
      }

      return adapter.res.status(200).send({
        product: response.product,
      });
    } catch (error) {
      return adapter.res.status(500).send({ 
        message: error 
    });
    }
  }
}
