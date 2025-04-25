import { IConfirmMailDTO } from './IConfirmMailDTO';
import { UserNotFoundError } from '@application/handlers/UseCasesResponses/User/IConfirmMailHandlers';
import { User } from '@domain/entities/User';
import { IUserRepository } from '@domain/repositories/IUserRepository';

export class IConfirmMailUseCase {
  constructor(
    private readonly iUserRepository: IUserRepository
  ) {}

  async execute({ email, token }: IConfirmMailDTO): Promise<UserNotFoundError | void> {
    const isUser: User | null = await this.iUserRepository.findUserByEmail({
      email
    });

    if (!isUser) return new UserNotFoundError();

    await this.iUserRepository.verifyUser(email);
  }
}
