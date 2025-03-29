import { IRegisterRepoImpl } from '../../../../infra/repositories_implementation/User/Register/IRegisterRepoImpl';
import { IMailProviderImpl } from '../../../../infra/providers_implementation/Mail/IMailProviderImplementation';
import { IHashServiceImpl } from '../../../../infra/services_implementation/IHashServiceImpl';
import { IRegisterUseCase } from './IRegisterUseCase';
import { IRegisterController } from './IRegisterController';

const iRegisterRepo = new IRegisterRepoImpl();
const iMailProvider = new IMailProviderImpl();
const iHashService = new IHashServiceImpl();
const iRegisterUseCase = new IRegisterUseCase(
  iRegisterRepo,
  iMailProvider,
  iHashService
);
const iRegisterController = new IRegisterController(
  iRegisterUseCase
);

export const register: IRegisterController = iRegisterController;
