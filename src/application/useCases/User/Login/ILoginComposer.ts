import { ILoginController } from "./ILoginController";
import { ILoginFactory } from "@application/factories/User/Login/ILoginFactory";

const iLoginFactory = new ILoginFactory();
const iLoginUseCase = iLoginFactory.compose();
const iLoginController = new ILoginController(iLoginUseCase);
export const login: ILoginController = iLoginController;
