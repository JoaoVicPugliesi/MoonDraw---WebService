import { ILoginUseCase } from '@application/useCases/User/Login/ILoginUseCase';
import { User } from '@domain/entities/User';
import { IMailProvider } from '@domain/providers/repositories/Mail/IMailProvider';
import { IRegisterDTO } from './IRegisterDTO';
import {
  InvalidUserConflictErrorResponse,
  RegisterReponse,
} from '@application/handlers/UseCasesResponses/User/IRegisterHandlers';
import SMTPTransport from 'nodemailer/lib/smtp-transport';
import {
  InvalidPasswordIsNotEqualErrorResponse,
  InvalidUserNotFoundErrorResponse,
  LoginResponse,
} from '@application/handlers/UseCasesResponses/User/ILoginHandlers';
import { InvalidGenerateRefreshTokenErrorResponse } from '@application/handlers/UseCasesResponses/RefreshToken/IGenerateRefreshTokenHandler';
import { IUserRepository } from '@domain/repositories/IUserRepository';

export class IRegisterUseCase {
  constructor(
    private readonly iUserRepository: IUserRepository,
    private readonly iMailProvider: IMailProvider,
    private readonly iLoginUseCase: ILoginUseCase
  ) {}

  async execute(
    {
      name,
      surname,
      email,
      password,
      confirmPassword
    }: IRegisterDTO
  ): Promise<InvalidUserConflictErrorResponse | RegisterReponse> {
    const isUser: User | null = await this.iUserRepository.findUser(email);

    if (isUser) return new InvalidUserConflictErrorResponse();

    const user: User = await this.iUserRepository.saveUser({
      name,
      surname,
      email,
      password,
      confirmPassword
    });

    const mailResponse: SMTPTransport.SentMessageInfo =
      await this.iMailProvider.sendMail({
        to: {
          email: user.email,
        },
        from: {
          email: 'ecommerce@gmail.com',
        },
        subject: 'Confirm Email',
        text: 'blabla',
        body: '<p>2hd8k3</p>',
      });

    const loginResponse:
      | InvalidUserNotFoundErrorResponse
      | InvalidPasswordIsNotEqualErrorResponse
      | InvalidGenerateRefreshTokenErrorResponse
      | LoginResponse = await this.iLoginUseCase.execute({
      email: user.email,
      password: password,
    });

    return {
      mail_response: mailResponse,
      login_response: loginResponse,
    };
  }
}
