import { IRegisterValidator } from '@application/validators/IRegisterValidator';
import { IRegisterController } from './IRegisterController';
import { IRegisterFactory } from '@application/factories/User/Register/IRegisterFactory';

const iFactory = new IRegisterFactory();
const iUseCase = iFactory.compose();
const iValidator = new IRegisterValidator();
const iController = new IRegisterController(iUseCase, iValidator);
const iRegister: IRegisterController = iController;

export { iRegister };