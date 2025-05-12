import { ICacheProvider } from '@domain/providers/Cache/ICacheProvider';
import { IMailProvider } from '@domain/providers/Mail/IMailProvider';
import {
  IResendVerificationTokenDTO,
  IResendVerificationTokenResponse,
  SessionIsExpiredErrorResponse,
} from './IResendVerificationTokenDTO';
import { IRegisterDTO } from '../Register/IRegisterDTO';

export class IResendVerificationTokenUseCase {
  constructor(
    private readonly iCacheProvider: ICacheProvider,
    private readonly iMailProvider: IMailProvider
  ) {}

  async execute({
    verification_token,
  }: IResendVerificationTokenDTO): Promise<IResendVerificationTokenResponse> {
    const userCached: string | null = await this.iCacheProvider.get(
      `user-${verification_token}`
    );

    if (!userCached) return new SessionIsExpiredErrorResponse();

    const { name, email }: Omit<IRegisterDTO, 'confirmPassword'> =
      JSON.parse(userCached);

    await this.iMailProvider.sendMail({
      to: {
        email: email,
      },
      from: {
        email: process.env.OFFICIAL_MAIL!,
      },
      subject: 'Welcome to our Website!',
      text: `Hello ${name}, you are almost there`,
      body: ` 
            <p>Visit https://localhost:5000/verification and type in the code below.</p> <br>
            <p>Code: ${verification_token}</p>
          `,
    });

    return {
      success: true
    };
  }
}
