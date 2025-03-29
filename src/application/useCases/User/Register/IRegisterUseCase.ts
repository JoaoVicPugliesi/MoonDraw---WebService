import { User } from '../../../../domain/entities/User';
import { IHashService } from '../../../../domain/services/IHashService';
import { IRegisterRepo } from '../../../../domain/repositories/User/IRegisterRepo';
import { IMailProvider } from '../../../../domain/providers/repositories/Mail/IMailProvider';
import { IRegisterDTO } from './IRegisterDTO';
import { randomBytes } from 'crypto';

export class IRegisterUseCase {
  constructor(
    private readonly iRegisterRepo: IRegisterRepo,
    private readonly iMailProvider: IMailProvider,
    private readonly iHashService: IHashService
  ) {}

  async execute(DTO: IRegisterDTO): Promise<boolean | User> {
    const isUser: boolean = await this.iRegisterRepo.findUser(DTO.email);

    if (isUser) return false;

    const user: User = await this.iRegisterRepo.save(
      DTO,
      this.iHashService
    );

    const mailToken: string = randomBytes(65).toString('hex');

    await this.iMailProvider.sendMail({
      to: {
        email: user.email,
      },
      from: {
        email: 'ecommerce@gmail.com',
      },
      subject: 'Confirm Email',
      text: 'blabla',
      body: `<button data-mail=${user.email} data-token=${mailToken}>Confirm Email</button>`,
    });

    return user;
  }
}
