import { ILoginUseCase } from '@application/useCases/User/Login/ILoginUseCase';
import { User } from '@domain/entities/User';
import { IMailProvider } from '@domain/providers/repositories/Mail/IMailProvider';
import { IRegisterDTO } from './IRegisterDTO';
import {
  InvalidUserConflictErrorResponse,
  IRegisterReponse,
} from '@application/handlers/UseCasesResponses/User/IRegisterHandlers';
import {
  InvalidPasswordIsNotEqualErrorResponse,
  InvalidUserNotFoundErrorResponse,
  ILoginResponse,
} from '@application/handlers/UseCasesResponses/User/ILoginHandlers';
import { InvalidGenerateRefreshTokenErrorResponse } from '@application/handlers/UseCasesResponses/RefreshToken/IGenerateRefreshTokenHandler';
import { IUserRepository } from '@domain/repositories/IUserRepository';
import { IAssignCartOwnerUseCase } from '@application/useCases/Сart/AssignCartOwner/IAssignCartOwnerUseCase';
import {
  IAssignCartOwnerResponse,
  InvalidOwnerNotFoundErrorResponse,
} from '@application/handlers/UseCasesResponses/Cart/IAssignCartOwnerHandlers';

export class IRegisterUseCase {
  constructor(
    private readonly iUserRepository: IUserRepository,
    private readonly iMailProvider: IMailProvider,
    private readonly iAssignCartOwnerUseCase: IAssignCartOwnerUseCase,
    private readonly iLoginUseCase: ILoginUseCase
  ) {}

  async execute({
    name,
    surname,
    email,
    password,
    confirmPassword,
  }: IRegisterDTO): Promise<
    InvalidUserConflictErrorResponse | IRegisterReponse
  > {
    const response: User | null = await this.iUserRepository.findUserByEmail({
      email
    });

    if (response) return new InvalidUserConflictErrorResponse();

    const user: User = await this.iUserRepository.saveUser({
      name,
      surname,
      email,
      password,
      confirmPassword,
    });

    const iAssignCartOwnerResponse:
      | InvalidOwnerNotFoundErrorResponse
      | IAssignCartOwnerResponse = await this.iAssignCartOwnerUseCase.execute({
      public_id: user.public_id,
    });

    await this.iMailProvider.sendMail({
      to: { 
        email: user.email 
      },
      from: { 
        email: 'mrlanguages62@gmail.com' 
      },
      subject: 'Welcome to our Website!',
      text: `Hello ${user.name}, welcome!`,
      body: `<p>Hello ${user.name},</p><p>Thanks for registering. Click <a href="http://localhost:8000/confirm?user=${user.public_id}">here</a> to confirm your email.</p>`,
    });

    const loginResponse:
      | InvalidUserNotFoundErrorResponse
      | InvalidPasswordIsNotEqualErrorResponse
      | InvalidGenerateRefreshTokenErrorResponse
      | ILoginResponse = await this.iLoginUseCase.execute({
      email: user.email,
      password: password,
    });

    return {
      assign_cart_owner_response: iAssignCartOwnerResponse,
      login_response: loginResponse,
    };
  }
}
