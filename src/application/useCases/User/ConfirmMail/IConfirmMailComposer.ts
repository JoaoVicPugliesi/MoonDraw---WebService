import { IConfirmMailFactory } from '@application/factories/User/ConfirmMail/IConfirmMailFactory';
import { IConfirmMailController } from './IConfirmMailController';
import { IConfirmMailValidator } from '@application/validators/IConfirmMailValidator';
import { IEnsureMiddlewareImpl } from '@application/middlewares/IEnsureMiddlewareImpl';

const iFactory = new IConfirmMailFactory();
const iUseCase = iFactory.compose();
const iValidator = new IConfirmMailValidator();
const iEnsureMiddleware = new IEnsureMiddlewareImpl();
const iController = new IConfirmMailController(iUseCase, iValidator, iEnsureMiddleware);
const iConfirmMail: IConfirmMailController = iController;

export { iConfirmMail };
