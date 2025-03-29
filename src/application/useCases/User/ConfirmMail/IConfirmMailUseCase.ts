import { IConfirmMailRepo } from "@domain/repositories/User/IConfirmMailRepo";
import { IConfirmMailDTO } from "./IConfirmMailDTO";

export class IConfirmMailUseCase {
  constructor(private readonly iConfirmMailRepo: IConfirmMailRepo) {}

  async execute(DTO: IConfirmMailDTO): Promise<boolean | void> {
    const isUser: boolean = await this.iConfirmMailRepo.findUser(DTO.email);

    if (!isUser) return false;

    await this.iConfirmMailRepo.activateUser(DTO.email);
  }
}
