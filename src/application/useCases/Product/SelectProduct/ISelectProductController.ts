import { ISelectProductUseCase } from './ISelectProductUseCase';
import { ITokenService } from '@domain/services/Token/ITokenService';
import {
  ISelectProductDTO,
  ProductNotFoundErrorResponse,
  SelectProductResponse,
} from './ISelectProductDTO';
import { IEnsureAuthMiddleware } from '@application/middlewares/Auth/IEnsureAuthMiddleware';
import {
  TokenInvalidErrorResponse,
  TokenIsMissingErrorResponse,
} from '@application/handlers/MiddlewareResponses/AuthMiddlewareHandlers';
import { RequestResponseAdapter } from '@adapters/RequestResponseAdapter';

export class ISelectProductController {
  constructor(
    private readonly iSelectProductUseCase: ISelectProductUseCase,
    private readonly iTokenService: ITokenService,
    private readonly iEnsureAuthMiddleware: IEnsureAuthMiddleware
  ) {}

  async handle(adapter: RequestResponseAdapter) {
    const ensure:
      | TokenIsMissingErrorResponse
      | TokenInvalidErrorResponse
      | void = this.iEnsureAuthMiddleware.ensureAccessToken(
      adapter,
      this.iTokenService,
      process.env.JWT_SECRET_KEY!
    );

    if (ensure instanceof TokenIsMissingErrorResponse) {
      return adapter.res
        .status(401)
        .send({ message: 'Access Token is missing' });
    }
    if (ensure instanceof TokenInvalidErrorResponse) {
      return adapter.res
        .status(401)
        .send({ message: 'Access Token is invalid' });
    }
    try {
      const { public_id }: ISelectProductDTO = adapter.req
        .params as ISelectProductDTO;
      const response: SelectProductResponse | ProductNotFoundErrorResponse =
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
