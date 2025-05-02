import { IEnsureMiddleware } from '@application/middlewares/IEnsureMiddleware';
import { IGetCartUseCase } from './IGetCartUseCase';
import { ITokenService } from '@domain/services/Token/ITokenService';
import { CartNotFoundErrorResponse, IGetCartDTO, IGetCartResponse } from './IGetCartDTO';
import { TokenInvalidErrorResponse, TokenIsMissingErrorResponse } from '@application/handlers/MiddlewareResponses/MiddlewareHandlers';
import { RequestResponseAdapter } from '@adapters/RequestResponseAdapter';

export class IGetCartController {
  constructor(
    private readonly iGetCartUseCase: IGetCartUseCase,
    private readonly iTokenService: ITokenService,
    private readonly iEnsureMiddlware: IEnsureMiddleware
  ) {}

  async handle(adapter: RequestResponseAdapter) {
    const ensure:
      | void
      | TokenIsMissingErrorResponse
      | TokenInvalidErrorResponse = this.iEnsureMiddlware.ensureAccessToken(
      adapter,
      this.iTokenService,
      process.env.JWT_SECRET_KEY!
    );

    if (ensure instanceof TokenIsMissingErrorResponse) {
      return adapter.res.status(401).send({ message: 'Access Token is missing' });
    }
    if (ensure instanceof TokenInvalidErrorResponse) {
      return adapter.res.status(401).send({ message: 'Access Token is invalid' });
    }

    try {
      const { 
        owner_id 
      }: IGetCartDTO = adapter.req.params as IGetCartDTO;
      const response: CartNotFoundErrorResponse | IGetCartResponse =
        await this.iGetCartUseCase.execute({
          owner_id,
        });

      if (response instanceof CartNotFoundErrorResponse) {
        return adapter.res.status(404).send({
          message: 'Cart Not Found',
        });
      }

      return adapter.res.status(200).send({
        cart: response.cart,
      });
    } catch (error) {
      return adapter.res.status(500).send({
        message: 'Internal Server Error',
        error: error,
      });
    }
  }
}
