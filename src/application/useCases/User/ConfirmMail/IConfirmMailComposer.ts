import { IConfirmMailFactory } from "@application/factories/User/ConfirmMail/IConfirmMailFactory";
import { IConfirmMailController } from "./IConfirmMailController";

const iConfirmMailFactory = new IConfirmMailFactory();
const iConfirmMailUseCase = iConfirmMailFactory.compose();
const iConfirmMailController = new IConfirmMailController(iConfirmMailUseCase);
const confirmMail: IConfirmMailController = iConfirmMailController;

export { confirmMail };
