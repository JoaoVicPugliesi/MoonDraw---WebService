import { IConfirmMailFactory } from '@application/factories/User/ConfirmMail/IConfirmMailFactory';
import { IConfirmMailController } from './IConfirmMailController';
import { IConfirmMailValidator } from '@application/validators/IConfirmMailValidator';

const iFactory = new IConfirmMailFactory();
const iUseCase = iFactory.compose();
const iValidator = new IConfirmMailValidator();
const iController = new IConfirmMailController(iUseCase, iValidator);
const iConfirmMail: IConfirmMailController = iController;

export { iConfirmMail };
