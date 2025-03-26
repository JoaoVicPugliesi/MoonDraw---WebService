import { User } from "../../../../domain/entities/User";
import { ICreateUserRepo } from "../../../../domain/repositories/User/CreateUser/ICreateUserRepo";
import { ICreateUserDTO } from "./ICreateUserDTO";

export class ICreateUserUseCase {
  constructor(private readonly iCreateUserRepo: ICreateUserRepo) {}

  async execute(DTO: ICreateUserDTO): Promise<boolean | void> {
    const isUser: boolean = await this.iCreateUserRepo.findUser(DTO.email);

    if (isUser) {
      return false;
    }

    const user: User = await this.iCreateUserRepo.save(DTO);

    console.log(user);
  }
}
