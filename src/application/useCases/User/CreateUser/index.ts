import { ICreateUserRepoImpl } from "../../../../infra/repositories_implementation/User/ICreateUserRepoImpl";
import { IMailProviderImpl } from "./../../../../infra/providers_implementation/Mail/IMailProviderImplementation";
import { IBCryptServiceImpl } from "../../../../infra/services_implementation/IBCryptServiceImpl";
import { ICreateUserUseCase } from "./ICreateUserUseCase";
import { ICreateUserController } from "./ICreateUserController";

const iBCryptService = new IBCryptServiceImpl();
const iCreateUserRepo = new ICreateUserRepoImpl();
const iMailProvider = new IMailProviderImpl();
const iCreateUserUseCase = new ICreateUserUseCase(
  iCreateUserRepo,
  iMailProvider,
  iBCryptService
);
const iCreateUserController = new ICreateUserController(
  iCreateUserUseCase
);

export const createUser: ICreateUserController = iCreateUserController;
