import { IConfirmMailFactory } from '@application/factories/User/ConfirmMail/IConfirmMailFactory';
import { IConfirmMailController } from './IConfirmMailController';

const iFactory = new IConfirmMailFactory();
const iUseCase = iFactory.compose();
const iController = new IConfirmMailController(iUseCase);
const iConfirmMail: IConfirmMailController = iController;

export { iConfirmMail };
