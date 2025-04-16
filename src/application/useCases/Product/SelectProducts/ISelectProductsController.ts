import { RequestResponseAdapter } from '@adapters/ServerAdapter';
import { ISelectProductsUseCase } from './ISelectProductsUseCase';
import { ISelectProductsDTO } from './ISelectProductsDTO';
import { IEnsureAccessTokenMiddleware } from '@application/middlewares/IEnsureAccessTokenMiddleware';
import { ITokenServiceJWTImpl } from '@infra/services_implementation/ITokenServiceJWTImpl';
import {
  SelectProductsResponse,
  InvalidProductsNotFoundErrorResponse,
} from '@application/handlers/UseCasesResponses/Product/ISelectProductsHandlers';

export class ISelectProductsController {
  constructor(
    private readonly iSelectProductsUseCase: ISelectProductsUseCase
  ) {}

  async handle(adapter: RequestResponseAdapter) {
    try {
      const iTokenService = new ITokenServiceJWTImpl();
      const iEnsureAccessTokenMiddleware = new IEnsureAccessTokenMiddleware(
        adapter,
        iTokenService
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
        return adapter.res.status(404).send({ message: 'Products Not Found' });

      return adapter.res.status(200).send({ products: response.products });
    } catch (error) {
      return adapter.res.status(500).send({ message: error });
    }
  }
}
