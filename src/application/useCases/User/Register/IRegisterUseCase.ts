import { ILoginUseCase } from '@application/useCases/User/Login/ILoginUseCase';
import { User } from '@domain/entities/User';
import { IMailProvider } from '@domain/providers/Mail/IMailProvider';
import { IRegisterDTO } from './IRegisterDTO';
import {
  UserConflictErrorResponse,
  IRegisterReponse,
} from '@application/handlers/UseCasesResponses/User/IRegisterHandlers';
import {
  PasswordIsNotEqualErrorResponse,
  UserNotFoundErrorResponse,
  ILoginResponse,
} from '@application/handlers/UseCasesResponses/User/ILoginHandlers';
import { GenerateRefreshTokenErrorResponse } from '@application/handlers/UseCasesResponses/RefreshToken/IGenerateRefreshTokenHandler';
import { IUserRepository } from '@domain/repositories/IUserRepository';
import { IAssignCartOwnerUseCase } from '@application/useCases/Сart/AssignCartOwner/IAssignCartOwnerUseCase';
import {
  IAssignCartOwnerResponse,
  OwnerNotFoundErrorResponse,
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
    UserConflictErrorResponse | IRegisterReponse
  > {
    const response: User | null = await this.iUserRepository.findUserByEmail({
      email
    });

    if (response) return new UserConflictErrorResponse();

    const user: User = await this.iUserRepository.saveUser({
      name,
      surname,
      email,
      password,
      confirmPassword,
    });

    const iAssignCartOwnerResponse:
      | OwnerNotFoundErrorResponse
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
      | UserNotFoundErrorResponse
      | PasswordIsNotEqualErrorResponse
      | GenerateRefreshTokenErrorResponse
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
