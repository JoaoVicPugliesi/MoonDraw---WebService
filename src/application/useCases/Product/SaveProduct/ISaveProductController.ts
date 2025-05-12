import z from 'zod';
import { ITokenService } from '@domain/services/Token/ITokenService';
import { ISaveProductUseCase } from './ISaveProductUseCase';
import {
  ISaveProductDTO,
  ProductAlreadyExistsErrorResponse,
} from './ISaveProductDTO';
import { IEnsureAuthMiddleware } from '@application/middlewares/Auth/IEnsureAuthMiddleware';
import { IProductValidator } from '@application/validators/Request/Product/IProductValidator';
import {
  MustBeAnArtistErrorResponse,
  TokenInvalidErrorResponse,
  TokenIsMissingErrorResponse,
} from '@application/handlers/MiddlewareResponses/MiddlewareHandlers';
import { RequestResponseAdapter } from '@adapters/RequestResponseAdapter';
import { IRateLimiterProvider } from '@domain/providers/RateLimiter/IRateLimiterProvider';
import { IEnsureRateLimitingMiddleware } from '@application/middlewares/RateLimiting/IEnsureRateLimitingMiddleware';
import { LimitExceededErrorResponse } from '@application/handlers/MiddlewareResponses/RateLimitingMiddlwareHandlers';

export class ISaveProductController {
  constructor(
    private readonly iSaveProductUseCase: ISaveProductUseCase,
    private readonly iTokenService: ITokenService,
    private readonly iProductValidator: IProductValidator,
    private readonly iEnsureAuthMiddleware: IEnsureAuthMiddleware,
    private readonly iRateLimiterProvider: IRateLimiterProvider,
    private readonly iEnsureRateLimitingMiddleware: IEnsureRateLimitingMiddleware
  ) {}

  async handle(adapter: RequestResponseAdapter) {
    const schema = this.iProductValidator.validateSaveProduct();
    const iEnsureRateLimiting: void | LimitExceededErrorResponse =
      await this.iEnsureRateLimitingMiddleware.ensureFixedWindow(
        adapter,
        this.iRateLimiterProvider,
        5,
        60,
        60 * 2
      );

    if (iEnsureRateLimiting instanceof LimitExceededErrorResponse) {
      const number: number = iEnsureRateLimiting.accessBanTime();
      return adapter.res.status(429).send({
        message: 'Exceeded Save Product Rate Limit',
        retryAfter: number,
      });
    }
    const iEnsureAuth:
      | void
      | TokenIsMissingErrorResponse
      | MustBeAnArtistErrorResponse
      | TokenInvalidErrorResponse =
      this.iEnsureAuthMiddleware.ensureUserIsAnArtist(
        adapter,
        this.iTokenService,
        process.env.JWT_SECRET_KEY!
      );

    if (iEnsureAuth instanceof TokenIsMissingErrorResponse) {
      return adapter.res
        .status(401)
        .send({ message: 'Access Token is missing' });
    }
    if (iEnsureAuth instanceof MustBeAnArtistErrorResponse) {
      return adapter.res
        .status(403)
        .send({ message: 'Only admins have access' });
    }
    if (iEnsureAuth instanceof TokenInvalidErrorResponse) {
      return adapter.res
        .status(401)
        .send({ message: 'Access Token is invalid' });
    }

    try {
      const {
        images_id,
        artist_id,
        name,
        description,
        price,
        supply,
        publisher,
      }: ISaveProductDTO = schema.parse(adapter.req.body);
      const response: ProductAlreadyExistsErrorResponse | void =
        await this.iSaveProductUseCase.execute({
          images_id,
          artist_id,
          name,
          description,
          price,
          supply,
          publisher,
        });
      if (response instanceof ProductAlreadyExistsErrorResponse) {
        return adapter.res
          .status(409)
          .send({ message: 'Product needs to have a unique name' });
      }

      return adapter.res
        .status(201)
        .send({ message: 'Product created successfully' });
    } catch (error) {
      if (error instanceof z.ZodError) {
        return adapter.res.status(422).send({
          message: 'Validation Error',
          errors: error.flatten().fieldErrors,
        });
      }

      return adapter.res.status(500).send({
        message: 'Intern Server Error',
      });
    }
  }
}
