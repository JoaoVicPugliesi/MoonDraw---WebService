import { IConfirmMailRepoImpl } from "@infra/repositories_implementation/User/ConfirmMail/IConfirmMailRepoImpl";
import { IConfirmMailUseCase } from "./IConfirmMailUseCase";
import { IConfirmMailController } from "./IConfirmMailController";

const iConfirmMailRepo = new IConfirmMailRepoImpl();
const iConfirmMailUseCase = new IConfirmMailUseCase(iConfirmMailRepo);
const iConfirmMailController = new IConfirmMailController(iConfirmMailUseCase);

export const confirmMail: IConfirmMailController = iConfirmMailController;
