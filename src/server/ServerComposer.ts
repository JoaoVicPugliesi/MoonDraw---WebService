import { iFastify } from './Fastify/FastifyInstance';
import { FastifyServerAdapter } from './Fastify/FastifyServerAdapter';
import { ProductEndpoints } from '@routes/Product/ProductEndpoints';
import { RefreshTokenEndpoints } from '@routes/RefreshToken/RefreshTokenEndpoints';
import { UserEndpoints } from '@routes/User/UserEndpoints';
import { Routes } from '@routes/Routes';
import { CartEndpoints } from '@routes/Cart/CartEndpoints';
import { PurchaseEndpoints } from '@routes/Purchase/PurchaseEndpoints';
import { IUserValidatorZodImpl } from '@application/validators/User/IUserValidatorZodImpl';
import { IProductValidatorZodImpl } from '@application/validators/Product/IProductValidatorZodImpl';
import { ICartValidatorZodImpl } from '@application/validators/Cart/ICartValidatorZodImpl';
import { IPurchaseValidatorZodImpl } from '@application/validators/Purchase/IPurchaseValidatorZodImpl';

const app = new FastifyServerAdapter(iFastify);
const iUserValidator = new IUserValidatorZodImpl();
const iProductValidator = new IProductValidatorZodImpl();
const iCartValidator = new ICartValidatorZodImpl();
const iPurchaseValidator = new IPurchaseValidatorZodImpl();
const user = new UserEndpoints(app, iUserValidator);
const refreshToken = new RefreshTokenEndpoints(app);
const product = new ProductEndpoints(app, iProductValidator);
const cart = new CartEndpoints(app, iCartValidator);
const purchase = new PurchaseEndpoints(app, iPurchaseValidator);
const routes = new Routes(user, refreshToken, product, cart, purchase);

app.setRoutes(routes);

export { app };
