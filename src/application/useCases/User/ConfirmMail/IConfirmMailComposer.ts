import { IConfirmMailFactory } from '@application/factories/User/ConfirmMail/IConfirmMailFactory';
import { IConfirmMailController } from './IConfirmMailController';
import { IEnsureMiddlewareImpl } from '@application/middlewares/IEnsureMiddlewareImpl';
import { IUserValidatorZodImpl } from '@application/validators/Request/User/IUserValidatorZodImpl';
import { ITokenServiceJWTImpl } from '@infra/services/ITokenServiceJWTImpl';

const iFactory = new IConfirmMailFactory();
const iUseCase = iFactory.compose();
const iValidator = new IUserValidatorZodImpl();
const iTokenService = new ITokenServiceJWTImpl();
const iEnsureMiddleware = new IEnsureMiddlewareImpl();
const iController = new IConfirmMailController(
  iUseCase,
  iValidator,
  iTokenService,
  iEnsureMiddleware
);
const iConfirmMail: IConfirmMailController = iController;

export { iConfirmMail };
