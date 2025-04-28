import { User } from '@domain/entities/User';
import { IMailProvider } from '@domain/providers/Mail/IMailProvider';
import { IRegisterDTO } from './IRegisterDTO';
import {
  UserConflictErrorResponse,
} from '@application/handlers/UseCasesResponses/User/IRegisterHandlers';
import { IUserRepository } from '@domain/repositories/IUserRepository';
import { ICacheProvider } from '@domain/providers/Cache/ICacheProvider';
import { IHashService } from '@domain/services/Hash/IHashService';
import { v4 as uuidv4 } from 'uuid';

export class IRegisterUseCase {
  constructor(
    private readonly iUserRepository: IUserRepository,
    private readonly iCacheProvider: ICacheProvider,
    private readonly iMailProvider: IMailProvider,
    private readonly iHashService: IHashService
  ) {}

  async execute({
    name,
    surname,
    email,
    password
  }: IRegisterDTO): Promise<
    UserConflictErrorResponse | void
  > {
    const response: User | null = await this.iUserRepository.findUserByEmail({
      email
    });

    if (response) return new UserConflictErrorResponse();
    
    const token: string = uuidv4();
    const hash = await this.iHashService.hash(password);

    await this.iCacheProvider.set(
      `user-${token}`,
      JSON.stringify({
        name: name,
        surname: surname,
        email: email,
        password: hash,
      }),
      {
        EX: 900
      }
    )

    await this.iMailProvider.sendMail({
      to: { 
        email: email 
      },
      from: { 
        email: process.env.OFFICIAL_MAIL! 
      },
      subject: 'Welcome to our Website!',
      text: `Hello ${name}, you are almost there`,
      body: 
      ` 
        <p>Visit https://localhost:5000/verification and type in the code below.</p> <br>
        <p>Code: ${token}</p>
      `,
    });
  }
}
