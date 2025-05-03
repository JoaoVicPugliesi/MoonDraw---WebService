import { RequestResponseAdapter } from '@adapters/RequestResponseAdapter';
import { IRateLimiterProvider } from '@domain/providers/RateLimiter/IRateLimiterProvider';
import { IEnsureRateLimitingMiddleware } from './IEnsureRateLimitingMiddleware';
import { LimitExceededErrorResponse } from '@application/handlers/MiddlewareResponses/RateLimitingMiddlwareHandlers';

export class IEnsureRateLimitingMiddlewareImpl implements IEnsureRateLimitingMiddleware
{
  async ensureFixedWindow(
    adapter: RequestResponseAdapter,
    iRateLimiterProvider: IRateLimiterProvider,
    limit: number,
    timeWindow: number
  ): Promise<LimitExceededErrorResponse | void> {
    const key = `ratelimit-${adapter.req.ip}`;
    await iRateLimiterProvider.incr(key);
    const count: string | null = await iRateLimiterProvider.get(key);
    if (Number(count) === 1) {
      await iRateLimiterProvider.expire(key, timeWindow);
    }

    if (Number(count) > limit) {
      return new LimitExceededErrorResponse();
    }
  }
}
