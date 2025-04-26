import { ILoginController } from './ILoginController';
import { ILoginFactory } from '@application/factories/User/Login/ILoginFactory';
import { IUserValidatorZodImpl } from '@application/validators/User/IUserValidatorZodImpl';

const iFactory = new ILoginFactory();
const iUseCase = iFactory.compose();
const iValidator = new IUserValidatorZodImpl();
const iController = new ILoginController(iUseCase, iValidator);
const iLogin: ILoginController = iController;

export { iLogin };
