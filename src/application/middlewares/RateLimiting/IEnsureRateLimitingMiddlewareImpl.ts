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
    timeWindow: number,
    banTime: number
  ): Promise<LimitExceededErrorResponse | void> {
    const ip = adapter.req.ip;
    const key = `ratelimit-${ip}`;
    
    const count = await iRateLimiterProvider.incr(key);
    
    if (count === 1) {
      await iRateLimiterProvider.expire(key, timeWindow);
    }
    
    if (count > limit) {
      const ttl = await iRateLimiterProvider.ttl(key);
      return new LimitExceededErrorResponse(ttl);
    }

  }
}
