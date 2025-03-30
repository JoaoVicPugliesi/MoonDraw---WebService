import { User } from '../../../../domain/entities/User';
import { IHashService } from '../../../../domain/services/IHashService';
import { IRegisterRepo } from '../../../../domain/repositories/User/IRegisterRepo';
import { IMailProvider } from '../../../../domain/providers/repositories/Mail/IMailProvider';
import { IRegisterDTO } from './IRegisterDTO';
import { randomBytes } from 'crypto';
import { InvalidUserConflictError } from '@application/handlers/User/IRegisterHandlers';

export class IRegisterUseCase {
  constructor(
    private readonly iRegisterRepo: IRegisterRepo,
    private readonly iMailProvider: IMailProvider,
    private readonly iHashService: IHashService
  ) {}

  async execute(DTO: IRegisterDTO): Promise<object | User> {
    const isUser: boolean = await this.iRegisterRepo.findUser(DTO.email);

    if (isUser) return new InvalidUserConflictError();

    const user: User = await this.iRegisterRepo.save(
      DTO,
      this.iHashService
    );

    const mailToken: string = randomBytes(3).toString('hex');

    await this.iMailProvider.sendMail({
      to: {
        email: user.email,
      },
      from: {
        email: 'ecommerce@gmail.com',
      },
      subject: 'Confirm Email',
      text: 'blabla',
      body: `<p>${mailToken}</p>`,
    });

    return user;
  }
}
