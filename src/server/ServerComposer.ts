import { iFastify } from './Fastify/FastifyInstance';
import { FastifyServerAdapter } from './Fastify/FastifyServerAdapter';
import { ProductEndpoints } from '@routes/Product/ProductEndpoints';
import { RefreshTokenEndpoints } from '@routes/RefreshToken/RefreshTokenEndpoints';
import { UserEndpoints } from '@routes/User/UserEndpoints';
import { Routes } from '@routes/Routes';
import { CartEndpoints } from '@routes/Cart/CartEndpoints';

const app = new FastifyServerAdapter(iFastify);
const user = new UserEndpoints(app);
const refreshToken = new RefreshTokenEndpoints(app);
const product = new ProductEndpoints(app);
const cart = new CartEndpoints(app);
const routes = new Routes(user, refreshToken, product, cart);

app.setRoutes(routes);

export { app };