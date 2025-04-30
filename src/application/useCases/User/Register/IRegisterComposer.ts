import { IRegisterController } from './IRegisterController';
import { IRegisterFactory } from '@application/factories/User/Register/IRegisterFactory';
import { IUserValidatorZodImpl } from '@application/validators/Request/User/IUserValidatorZodImpl';

const iFactory = new IRegisterFactory();
const iUseCase = iFactory.compose();
const iValidator = new IUserValidatorZodImpl();
const iController = new IRegisterController(iUseCase, iValidator);
const iRegister: IRegisterController = iController;

export { iRegister };