import { IRegisterController } from './IRegisterController';
import { IRegisterFactory } from '@application/factories/User/Register/IRegisterFactory';

const iFactory = new IRegisterFactory();
const iUseCase = iFactory.compose();
const iController = new IRegisterController(iUseCase);
const iRegister: IRegisterController = iController;

export { iRegister };