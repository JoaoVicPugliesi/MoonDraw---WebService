import { IConfirmMailRepo } from "@domain/repositories/User/IConfirmMailRepo";
import { IConfirmMailDTO } from "./IConfirmMailDTO";
import { InvalidUserNotFoundError } from "@application/handlers/User/IConfirmMailHandlers";

export class IConfirmMailUseCase {
  constructor(private readonly iConfirmMailRepo: IConfirmMailRepo) {}

  async execute(DTO: IConfirmMailDTO): Promise<InvalidUserNotFoundError | void> {
    const isUser: boolean = await this.iConfirmMailRepo.findUser(DTO.email);

    if (!isUser) return new InvalidUserNotFoundError();

    await this.iConfirmMailRepo.activateUser(DTO.email);
  }
}
