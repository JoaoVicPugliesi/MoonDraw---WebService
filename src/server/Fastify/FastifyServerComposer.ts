import fastify from "fastify";
import { ProductEndpoints } from '@routes/Product/ProductEndpoints';
import { RefreshTokenEndpoints } from '@routes/RefreshToken/RefreshTokenEndpoints';
import { UserEndpoints } from '@routes/User/UserEndpoints';
import { Routes } from "@routes/Routes";

const iFastify = fastify();
const user = new UserEndpoints(iFastify);
const refreshToken = new RefreshTokenEndpoints(iFastify);
const product = new ProductEndpoints(iFastify);
const routes = new Routes(user, refreshToken, product);

export { iFastify, routes };