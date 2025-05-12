import { RequestResponseAdapter } from '@adapters/RequestResponseAdapter';
import { LimitExceededErrorResponse } from '@application/handlers/MiddlewareResponses/RateLimitingMiddlwareHandlers';
import { IRateLimiterProvider } from '@domain/providers/RateLimiter/IRateLimiterProvider';

export interface IEnsureRateLimitingMiddleware {
  ensureFixedWindow(
    adapter: RequestResponseAdapter,
    iRateLimiterProvider: IRateLimiterProvider,
    limit: number,
    timeWindow: number,
    banTime?: number
  ): Promise<LimitExceededErrorResponse | void>;
}
