import { User } from '../../../../domain/entities/User';
import { IHashService } from '../../../../domain/services/IHashService';
import { IRegisterRepo } from '../../../../domain/repositories/User/IRegisterRepo';
import { IMailProvider } from '../../../../domain/providers/repositories/Mail/IMailProvider';
import { IRegisterDTO } from './IRegisterDTO';

export class IRegisterUseCase {
  constructor(
    private readonly iRegisterRepo: IRegisterRepo,
    private readonly iMailProvider: IMailProvider,
    private readonly iHashService: IHashService
  ) {}

  async execute(DTO: IRegisterDTO): Promise<boolean | User> {
    const isUser: boolean = await this.iRegisterRepo.findUser(DTO.email);

    if (isUser) {
      return false;
    }

    const user: User = await this.iRegisterRepo.save(
      DTO,
      this.iHashService
    );

    await this.iMailProvider.sendMail({
      to: {
        email: user.email,
      },
      from: {
        email: 'ecommerce@gmail.com',
      },
      subject: 'Confirm Email',
      text: 'blabla',
      body: '<button>Confirm Email</button>',
    });

    return user;
  }
}
