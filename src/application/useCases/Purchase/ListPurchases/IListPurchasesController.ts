import { ITokenService } from '@domain/services/ITokenService';
import { IListPurchasesUseCase } from './IListPurchasesUseCase';
import { RequestResponseAdapter } from '@adapters/ServerAdapter';
import { IEnsureAccessTokenMiddleware } from '@application/middlewares/IEnsureAccessTokenMiddleware';
import { TokenInvalidErrorResponse, TokenIsMissingErrorResponse } from '@application/handlers/MiddlewareResponses/MiddlewareHandlers';
import { IListPurchasesDTO } from './IListPurchasesDTO';
import { IListPurchaseResponse, PurchasesNotFoundErrorResponse } from '@application/handlers/UseCasesResponses/Purchase/IListPurchaseHandlers';

export class IListPurchasesController {
  constructor(
    private readonly iListPurchasesUseCase: IListPurchasesUseCase,
    private readonly iTokenService: ITokenService
  ) {}

  async handle(adapter: RequestResponseAdapter) {
    const iEnsureAccessTokenMiddleware = new IEnsureAccessTokenMiddleware(
      adapter,
      this.iTokenService
    );
    const ensure:
      | TokenIsMissingErrorResponse
      | TokenInvalidErrorResponse
      | void = iEnsureAccessTokenMiddleware.ensure();

    if (ensure instanceof TokenIsMissingErrorResponse) {
      return adapter.res.status(401).send({ message: 'Token is missing' });
    }
    if (ensure instanceof TokenInvalidErrorResponse) {
      return adapter.res.status(401).send({ message: 'Token is invalid' });
    }

    try {
        const { 
            user_id, 
            status 
        }: IListPurchasesDTO = adapter.req.query as IListPurchasesDTO;
        const response: 
        | IListPurchaseResponse
        | PurchasesNotFoundErrorResponse = await this.iListPurchasesUseCase.execute({
            user_id,
            status
        });
        
        if(response instanceof PurchasesNotFoundErrorResponse) {
            return adapter.res.status(404).send({ message: 'Purchases not found' });
        }

        return adapter.res.status(200).send({ purchases: response.purchases });
    } catch(error) {
        return adapter.res.status(500).send({ message: error });
    }
  }
}
