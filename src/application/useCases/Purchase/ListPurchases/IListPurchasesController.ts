import { IListPurchasesUseCase } from './IListPurchasesUseCase';
import { IListPurchaseResponse, IListPurchasesDTO, PurchasesNotFoundErrorResponse } from './IListPurchasesDTO';
import { IEnsureMiddleware } from '@application/middlewares/IEnsureMiddleware';
import { ITokenService } from '@domain/services/Token/ITokenService';
import { TokenInvalidErrorResponse, TokenIsMissingErrorResponse } from '@application/handlers/MiddlewareResponses/MiddlewareHandlers';
import { RequestResponseAdapter } from '@adapters/RequestResponseAdapter';

export class IListPurchasesController {
  constructor(
    private readonly iListPurchasesUseCase: IListPurchasesUseCase,
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
      return adapter.res.status(401).send({ message: 'Access Token is missing' });
    }
    if (ensure instanceof TokenInvalidErrorResponse) {
      return adapter.res.status(401).send({ message: 'Access Token is invalid' });
    }

    try {
      const { buyer_id, status }: IListPurchasesDTO = adapter.req
        .query as IListPurchasesDTO;
      const response: IListPurchaseResponse | PurchasesNotFoundErrorResponse =
        await this.iListPurchasesUseCase.execute({
          buyer_id,
          status,
        });

      if (response instanceof PurchasesNotFoundErrorResponse) {
        return adapter.res.status(404).send({ message: 'Purchases not found' });
      }

      return adapter.res.status(200).send({ purchases: response.purchases });
    } catch (error) {
      return adapter.res.status(500).send({ message: error });
    }
  }
}
