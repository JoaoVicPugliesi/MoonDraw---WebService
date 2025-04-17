import { ILoginController } from './ILoginController';
import { ILoginFactory } from '@application/factories/User/Login/ILoginFactory';

const iFactory = new ILoginFactory();
const iUseCase = iFactory.compose();
const iController = new ILoginController(iUseCase);
const iLogin: ILoginController = iController;

export { iLogin };
