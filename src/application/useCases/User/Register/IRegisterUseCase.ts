import { User } from '../../../../domain/entities/User';
import { IHashService } from '../../../../domain/services/IHashService';
import { IRegisterRepo } from '../../../../domain/repositories/User/IRegisterRepo';
import { IMailProvider } from '../../../../domain/providers/repositories/Mail/IMailProvider';
import { IRegisterDTO } from './IRegisterDTO';
import { InvalidUserConflictError } from '@application/handlers/User/IRegisterHandlers';
import SMTPTransport from 'nodemailer/lib/smtp-transport';

export class IRegisterUseCase {
  constructor(
    private readonly iRegisterRepo: IRegisterRepo,
    private readonly iMailProvider: IMailProvider,
    private readonly iHashService: IHashService
  ) {}

  async execute(DTO: IRegisterDTO): Promise<InvalidUserConflictError | object> {
    const isUser: boolean = await this.iRegisterRepo.findUser(DTO.email);

    if (isUser) return new InvalidUserConflictError();

    const user: User = await this.iRegisterRepo.saveUser(
      DTO,
      this.iHashService
    );

    const sent: SMTPTransport.SentMessageInfo = await this.iMailProvider.sendMail({
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

    return {
      email: sent,
      user: User
    };
  }
}
