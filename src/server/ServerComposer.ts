import { iFastify } from './Fastify/FastifyInstance';
import { Routes } from '@routes/Routes';
import { FastifyServerAdapter } from './Fastify/FastifyServerAdapter';
import { ProductEndpoints } from '@routes/Product/ProductEndpoints';
import { RefreshTokenEndpoints } from '@routes/RefreshToken/RefreshTokenEndpoints';
import { UserEndpoints } from '@routes/User/UserEndpoints';
import { CartEndpoints } from '@routes/Cart/CartEndpoints';
import { PurchaseEndpoints } from '@routes/Purchase/PurchaseEndpoints';
import { iUserDocs } from '@routes/User/docs/IUserDocsSwaggerZodImpl';
import { iPurchaseDocs } from '@routes/Purchase/docs/IPurchaseDocsSwaggerZodImpl';
import { iRefreshTokenDocs } from '@routes/RefreshToken/docs/IRefreshTokenDocsSwaggerZodImpl';
import { iProductDocs } from '@routes/Product/docs/IProductDocsSwaggerZodImpl';
import { iCartDocs } from '@routes/Cart/docs/ICartDocsSwaggerZodImpl';

const app = new FastifyServerAdapter(iFastify);

const user = new UserEndpoints(app, iUserDocs);
const refreshToken = new RefreshTokenEndpoints(app, iRefreshTokenDocs);
const product = new ProductEndpoints(app, iProductDocs);
const cart = new CartEndpoints(app, iCartDocs);
const purchase = new PurchaseEndpoints(app, iPurchaseDocs);
const routes = new Routes(user, refreshToken, product, cart, purchase);

app.setRoutes(routes);

export { app };
