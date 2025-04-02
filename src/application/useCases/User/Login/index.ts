import { ILoginFactory } from "@application/factories/User/Login/ILoginFactory";
import { ILoginController } from "./ILoginController";

const iLoginFactory = new ILoginFactory();
const iLoginUseCase = iLoginFactory.compose();
const iLoginController = new ILoginController(iLoginUseCase);
export const login: ILoginController = iLoginController;
