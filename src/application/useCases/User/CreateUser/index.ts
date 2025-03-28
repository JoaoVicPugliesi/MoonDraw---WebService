import { ICreateUserRepoImpl } from "../../../../infra/repositories_implementation/User/ICreateUserRepoImpl";
import { IMailProviderImpl } from "./../../../../infra/providers_implementation/Mail/IMailProviderImplementation";
import { IHashServiceImpl } from "../../../../infra/services_implementation/IHashServiceImpl";
import { ICreateUserUseCase } from "./ICreateUserUseCase";
import { ICreateUserController } from "./ICreateUserController";

const iCreateUserRepo = new ICreateUserRepoImpl();
const iMailProvider = new IMailProviderImpl();
const iHashService = new IHashServiceImpl();
const iCreateUserUseCase = new ICreateUserUseCase(
  iCreateUserRepo,
  iMailProvider,
  iHashService
);
const iCreateUserController = new ICreateUserController(
  iCreateUserUseCase
);

export const createUser: ICreateUserController = iCreateUserController;
