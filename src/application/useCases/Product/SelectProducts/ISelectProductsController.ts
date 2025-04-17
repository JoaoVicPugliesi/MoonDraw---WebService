import { RequestResponseAdapter } from '@adapters/ServerAdapter';
import { ISelectProductsUseCase } from './ISelectProductsUseCase';
import { ISelectProductsDTO } from './ISelectProductsDTO';
import { IEnsureAccessTokenMiddleware } from '@application/middlewares/IEnsureAccessTokenMiddleware';

import {
  SelectProductsResponse,
  InvalidProductsNotFoundErrorResponse,
} from '@application/handlers/UseCasesResponses/Product/ISelectProductsHandlers';
import { ITokenService } from '@domain/services/ITokenService';

export class ISelectProductsController {
  constructor(
    private readonly iSelectProductsUseCase: ISelectProductsUseCase,
    private readonly iTokenService: ITokenService
  ) {}

  async handle(adapter: RequestResponseAdapter) {
    try {
      const iEnsureAccessTokenMiddleware = new IEnsureAccessTokenMiddleware(
        adapter,
        this.iTokenService
      );
      iEnsureAccessTokenMiddleware.ensure();
      const { page }: ISelectProductsDTO = adapter.req
        .params as ISelectProductsDTO;
      const response:
        | SelectProductsResponse
        | InvalidProductsNotFoundErrorResponse =
        await this.iSelectProductsUseCase.execute({
          page,
        });

      if (response instanceof InvalidProductsNotFoundErrorResponse)
        return adapter.res.status(404).send({ 
          message: 'Products Not Found' 
        });

      return adapter.res.status(200).send({ 
        products: response.products 
      });
    } catch (error) {
      return adapter.res.status(500).send({ 
        message: error 
      });
    }
  }
}
