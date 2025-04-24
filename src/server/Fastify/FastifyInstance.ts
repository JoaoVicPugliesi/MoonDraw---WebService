import fastify from 'fastify';
import fs from 'fs';

const iFastify = fastify({
    maxParamLength: 500,
    https: {
        cert: fs.readFileSync('src/server/SSL/code.crt'),
        key: fs.readFileSync('src/server/SSL/code.key'),
    }
});

export { iFastify };
