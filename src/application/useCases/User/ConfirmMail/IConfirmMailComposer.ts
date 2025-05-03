import { IConfirmMailFactory } from '@application/factories/User/ConfirmMail/IConfirmMailFactory';
import { IConfirmMailController } from './IConfirmMailController';
import { IEnsureAuthMiddlewareImpl } from '@application/middlewares/Auth/IEnsureAuthMiddlewareImpl';
import { IUserValidatorZodImpl } from '@application/validators/Request/User/IUserValidatorZodImpl';
import { ITokenServiceJWTImpl } from '@infra/services/ITokenServiceJWTImpl';

const iFactory = new IConfirmMailFactory();
const iUseCase = iFactory.compose();
const iValidator = new IUserValidatorZodImpl();
const iTokenService = new ITokenServiceJWTImpl();
const iEnsureAuthMiddleware = new IEnsureAuthMiddlewareImpl();
const iController = new IConfirmMailController(
  iUseCase,
  iValidator,
  iTokenService,
  iEnsureAuthMiddleware
);
const iConfirmMail: IConfirmMailController = iController;

export { iConfirmMail };
