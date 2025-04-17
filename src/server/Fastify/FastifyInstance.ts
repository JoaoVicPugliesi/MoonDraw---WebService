import fastify from 'fastify';

const iFastify = fastify({
    maxParamLength: 500
});

export { iFastify };
