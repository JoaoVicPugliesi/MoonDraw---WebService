import fastify, { FastifyBaseLogger, FastifyInstance, RawReplyDefaultExpression, RawRequestDefaultExpression, RawServerDefault } from 'fastify';
import { ZodTypeProvider } from 'fastify-type-provider-zod';

export type FastifyTypedInstance = FastifyInstance<
    RawServerDefault,
    RawRequestDefaultExpression,
    RawReplyDefaultExpression,
    FastifyBaseLogger,
    ZodTypeProvider
>

const iFastify = fastify({
    maxParamLength: 500,
}).withTypeProvider<ZodTypeProvider>();

export { iFastify };
