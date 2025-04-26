import { IConfirmMailFactory } from '@application/factories/User/ConfirmMail/IConfirmMailFactory';
import { IConfirmMailController } from './IConfirmMailController';
import { IEnsureMiddlewareImpl } from '@application/middlewares/IEnsureMiddlewareImpl';
import { IUserValidatorZodImpl } from '@application/validators/User/IUserValidatorZodImpl';

const iFactory = new IConfirmMailFactory();
const iUseCase = iFactory.compose();
const iValidator = new IUserValidatorZodImpl();
const iEnsureMiddleware = new IEnsureMiddlewareImpl();
const iController = new IConfirmMailController(iUseCase, iValidator, iEnsureMiddleware);
const iConfirmMail: IConfirmMailController = iController;

export { iConfirmMail };
