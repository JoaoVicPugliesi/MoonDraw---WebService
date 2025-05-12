import { User } from '@domain/entities/User';
import { IMailProvider } from '@domain/providers/Mail/IMailProvider';
import { IRegisterDTO, IRegisterResponse, UserConflictErrorResponse, UserProcessingConflictErrorResponse } from './IRegisterDTO';
import { IUserRepository } from '@domain/repositories/IUserRepository';
import { ICacheProvider } from '@domain/providers/Cache/ICacheProvider';
import { IHashService } from '@domain/services/Hash/IHashService';
import { IIdService } from '@domain/services/IIdService/IIdService';
import { ITokenService } from '@domain/services/Token/ITokenService';

export class IRegisterUseCase {
  constructor(
    private readonly iUserRepository: IUserRepository,
    private readonly iCacheProvider: ICacheProvider,
    private readonly iMailProvider: IMailProvider,
    private readonly iHashService: IHashService,
    private readonly iIdService: IIdService,
    private readonly iTokenService: ITokenService
  ) {}

  async execute({
    icon_id,
    name,
    surname,
    email,
    description,
    role,
    password
  }: IRegisterDTO): Promise<IRegisterResponse> {
    const user: User | null = await this.iUserRepository.findUserByEmail({
      email
    });

    if (user) return new UserConflictErrorResponse();

    const cachedUser: string | null = await this.iCacheProvider.get(`user-processing-${email}`);

    if(cachedUser) return new UserProcessingConflictErrorResponse();
    
    const verificationToken: string = this.iIdService.id6Len();
    const hash = await this.iHashService.hash(password);
    await this.iCacheProvider.set(
      `user-processing-${email}`,
      'processing',
      {
        EX: 900
      }
    )
    await this.iCacheProvider.set(
      `user-${verificationToken}`,
      JSON.stringify({
        icon_id: icon_id,
        name: name,
        surname: surname,
        email: email,
        description: description,
        role: role,
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
        <p>Code: ${verificationToken}</p>
      `,
    });

    const temporaryAccessToken = this.iTokenService.sign({
      payload: {
        content: {
          verification_token: verificationToken
        }
      },
      secret_key: process.env.JWT_TEMPORARY_KEY!,
      options: {
        expiresIn: '15m'
      }
    })
    return {
      temporary_access_token: temporaryAccessToken
    }
  }
}
