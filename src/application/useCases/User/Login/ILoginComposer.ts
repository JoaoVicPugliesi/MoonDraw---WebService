import { ILoginController } from "./ILoginController";
import { ILoginFactory } from "@application/factories/User/Login/ILoginFactory";

const iLoginFactory = new ILoginFactory();
const iLoginUseCase = iLoginFactory.compose();
const iLoginController = new ILoginController(iLoginUseCase);
const login: ILoginController = iLoginController;

export { login };
