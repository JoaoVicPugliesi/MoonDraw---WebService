import { ILoginValidator } from '@application/validators/ILoginValidator';
import { ILoginController } from './ILoginController';
import { ILoginFactory } from '@application/factories/User/Login/ILoginFactory';

const iFactory = new ILoginFactory();
const iUseCase = iFactory.compose();
const iValidator = new ILoginValidator();
const iController = new ILoginController(iUseCase, iValidator);
const iLogin: ILoginController = iController;

export { iLogin };
