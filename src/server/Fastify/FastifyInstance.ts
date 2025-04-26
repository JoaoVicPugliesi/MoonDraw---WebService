// import fs from 'fs';
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
    // https: {
    //     cert: fs.readFileSync('src/server/SSL/code.crt'),
    //     key: fs.readFileSync('src/server/SSL/code.key'),
    // }
}).withTypeProvider<ZodTypeProvider>();

export { iFastify };
