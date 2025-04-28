import { RequestResponseAdapter } from '@adapters/ServerAdapter';
import { ISelectProductUseCase } from './ISelectProductUseCase';
import { ITokenService } from '@domain/services/Token/ITokenService';
import { ISelectProductDTO, ProductNotFoundErrorResponse, SelectProductResponse } from './ISelectProductDTO';

import { IEnsureMiddleware } from '@application/middlewares/IEnsureMiddleware';
import { TokenInvalidErrorResponse, TokenIsMissingErrorResponse } from '@application/handlers/MiddlewareResponses/MiddlewareHandlers';

export class ISelectProductController {
  constructor(
    private readonly iSelectProductUseCase: ISelectProductUseCase,
    private readonly iTokenService: ITokenService,
    private readonly iEnsureMiddlware: IEnsureMiddleware
  ) {}

  async handle(adapter: RequestResponseAdapter) {
    const ensure:
      | TokenIsMissingErrorResponse
      | TokenInvalidErrorResponse
      | void = this.iEnsureMiddlware.ensureAccessToken(
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
      const { public_id }: ISelectProductDTO = adapter.req
        .query as ISelectProductDTO;
      const response:
        | SelectProductResponse
        | ProductNotFoundErrorResponse =
        await this.iSelectProductUseCase.execute({
          public_id,
        });

      if (response instanceof ProductNotFoundErrorResponse) {
        return adapter.res.status(404).send({
          message: 'Product Not Found',
        });
      }

      return adapter.res.status(200).send({
        product: response.product,
      });
    } catch (error) {
      return adapter.res.status(500).send({
        message: error,
      });
    }
  }
}
