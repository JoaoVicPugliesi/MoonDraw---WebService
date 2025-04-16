import { IConfirmMailRepo } from "@domain/repositories/User/IConfirmMailRepo";
import { IConfirmMailDTO } from "./IConfirmMailDTO";
import { InvalidUserNotFoundError } from "@application/handlers/UseCasesResponses/User/IConfirmMailHandlers";

export class IConfirmMailUseCase {
  constructor(
    private readonly iConfirmMailRepo: IConfirmMailRepo
  ) {}

  async execute({ email, token }: IConfirmMailDTO): Promise<InvalidUserNotFoundError | void> {
    const isUser: boolean = await this.iConfirmMailRepo.findUser(email);

    if (!isUser) return new InvalidUserNotFoundError();

    await this.iConfirmMailRepo.activateUser(email);
  }
}
