import { IPasswordServiceImpl } from "../../../../infra/services_implementation/IPasswordServiceImpl";
import { ICreateUserRepoImpl } from "../../../../infra/repositories_implementation/User/ICreateUserRepoImpl";
import { IMailProviderImpl } from "./../../../../infra/providers_implementation/Mail/IMailProviderImplementation";
import { ICreateUserUseCase } from "./ICreateUserUseCase";
import { ICreateUserController } from "./ICreateUserController";

const iPasswordService: IPasswordServiceImpl = new IPasswordServiceImpl();
const iCreateUserRepo: ICreateUserRepoImpl = new ICreateUserRepoImpl();
const iMailProvider: IMailProviderImpl = new IMailProviderImpl();
const iCreateUserUseCase: ICreateUserUseCase = new ICreateUserUseCase(
  iCreateUserRepo,
  iMailProvider,
  iPasswordService
);
const iCreateUserController: ICreateUserController = new ICreateUserController(
  iCreateUserUseCase
);

export const createUser: ICreateUserController = iCreateUserController;
