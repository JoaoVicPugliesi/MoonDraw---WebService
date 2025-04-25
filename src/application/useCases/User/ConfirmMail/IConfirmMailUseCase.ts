import { IConfirmMailDTO } from './IConfirmMailDTO';
import { InvalidUserNotFoundError } from '@application/handlers/UseCasesResponses/User/IConfirmMailHandlers';
import { User } from '@domain/entities/User';
import { IUserRepository } from '@domain/repositories/IUserRepository';

export class IConfirmMailUseCase {
  constructor(
    private readonly iUserRepository: IUserRepository
  ) {}

  async execute({ email, token }: IConfirmMailDTO): Promise<InvalidUserNotFoundError | void> {
    const isUser: User | null = await this.iUserRepository.findUserByEmail({
      email
    });

    if (!isUser) return new InvalidUserNotFoundError();

    await this.iUserRepository.activateUser(email);
  }
}
