import { ILoginUseCase } from '@application/useCases/User/Login/ILoginUseCase';
import { User } from '@domain/entities/User';
import { IRegisterRepo } from '@domain/repositories/User/IRegisterRepo';
import { IMailProvider } from '@domain/providers/repositories/Mail/IMailProvider';
import { IRegisterDTO } from './IRegisterDTO';
import {
  InvalidUserConflictError,
  RegisterReponse,
} from '@application/handlers/User/IRegisterHandlers';
import SMTPTransport from 'nodemailer/lib/smtp-transport';
import {
  InvalidPasswordIsNotEqualError,
  InvalidUserNotFoundError,
  LoginResponse,
} from '@application/handlers/User/ILoginHandlers';
import { InvalidGenerateRefreshToken } from '@application/handlers/RefreshToken/IGenerateRefreshTokenHandler';

export class IRegisterUseCase {
  constructor(
    private readonly iRegisterRepo: IRegisterRepo,
    private readonly iMailProvider: IMailProvider,
    private readonly iLoginUseCase: ILoginUseCase
  ) {}

  async execute(
    DTO: IRegisterDTO
  ): Promise<InvalidUserConflictError | RegisterReponse> {
    const isUser: boolean = await this.iRegisterRepo.findUser(DTO.email);

    if (isUser) return new InvalidUserConflictError();

    const user: User = await this.iRegisterRepo.saveUser(
      DTO
    );

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
      | InvalidUserNotFoundError
      | InvalidPasswordIsNotEqualError
      | InvalidGenerateRefreshToken
      | LoginResponse = await this.iLoginUseCase.execute({
      email: user.email,
      password: DTO.password,
    });

    return {
      mail_response: mailResponse,
      login_response: loginResponse,
    };
  }
}
