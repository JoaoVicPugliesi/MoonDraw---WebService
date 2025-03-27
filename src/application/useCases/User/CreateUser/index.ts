import { IBCryptServiceImpl } from "../../../../infra/services_implementation/IBCryptServiceImpl";
import { ICreateUserRepoImpl } from "../../../../infra/repositories_implementation/User/ICreateUserRepoImpl";
import { IMailProviderImpl } from "./../../../../infra/providers_implementation/Mail/IMailProviderImplementation";
import { ICreateUserUseCase } from "./ICreateUserUseCase";
import { ICreateUserController } from "./ICreateUserController";

const iBCryptService: IBCryptServiceImpl = new IBCryptServiceImpl();
const iCreateUserRepo: ICreateUserRepoImpl = new ICreateUserRepoImpl();
const iMailProvider: IMailProviderImpl = new IMailProviderImpl();
const iCreateUserUseCase: ICreateUserUseCase = new ICreateUserUseCase(
  iCreateUserRepo,
  iMailProvider,
  iBCryptService
);
const iCreateUserController: ICreateUserController = new ICreateUserController(
  iCreateUserUseCase
);

export const createUser: ICreateUserController = iCreateUserController;
