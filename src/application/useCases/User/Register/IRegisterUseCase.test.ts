import {
  InvalidUserConflictErrorResponse,
  RegisterReponse,
} from '@application/handlers/UseCasesResponses/User/IRegisterHandlers';
import { User } from '@domain/entities/User';
import { RefreshToken } from '@domain/entities/RefreshToken';
import {
  InvalidPasswordIsNotEqualErrorResponse,
  InvalidUserNotFoundErrorResponse,
} from '@application/handlers/UseCasesResponses/User/ILoginHandlers';
import { InvalidGenerateRefreshTokenErrorResponse } from '@application/handlers/UseCasesResponses/RefreshToken/IGenerateRefreshTokenHandler';
import { IRegisterFactoryInMemory } from '@application/factories/User/Register/IRegisterFactoryInMemory';
import { IRegisterUseCase } from './IRegisterUseCase';
import { configDotenv } from 'dotenv';
import { IRegisterDTO } from './IRegisterDTO';
configDotenv();

// Mocks
const iMailProvider = { sendMail: jest.fn() };

type Registered = InvalidUserConflictErrorResponse | RegisterReponse;
const users: User[] = [];
const refreshTokens: RefreshToken[] = [];

const user: User = {
  id: users.length + 1,
  public_id: '56d7ff79-f16d-434b-9183-5b0db27fa4e2',
  name: 'João',
  surname: 'Pugliesi',
  email: 'mrlanguages62@gmail.com',
  password: '$2b$10$GX73JFHmigssj00i5mES9uak392P5wSrS6caNFaQ0ybZkm2TBuBkK',
  role: 'client',
  is_active: false,
  created_at: new Date(),
  email_verified_at: null,
};
users.push(user);

describe('I register use case', () => {
  it('must fail for the reason email should be unique and user already exists', async () => {
    // Arrange
    const iRegisterFactoryInMemory = new IRegisterFactoryInMemory(
      users,
      refreshTokens,
      iMailProvider
    );
    const sut: IRegisterUseCase = iRegisterFactoryInMemory.compose();
    const { name, surname, email, password, confirmPassword }: IRegisterDTO = {
      name: 'João',
      surname: 'Pugliesi',
      email: 'mrlanguages62@gmail.com',
      password: 'Mrlanguages1234##',
      confirmPassword: 'Mrlanguages1234##'
    };
    
    // Act
    const response: Registered = await sut.execute({
      name,
      surname,
      email,
      password,
      confirmPassword
    });

    // Assert
    expect(response).toBeInstanceOf(InvalidUserConflictErrorResponse);
  });

  it('must register a user successfully', async () => {
    // Arrange
    const usersSpliced = users.toSpliced(0);
    const iRegisterFactoryInMemory = new IRegisterFactoryInMemory(
      usersSpliced,
      refreshTokens,
      iMailProvider
    );
    const sut: IRegisterUseCase = iRegisterFactoryInMemory.compose();
    const { name, surname, email, password, confirmPassword }: IRegisterDTO = {
      name: 'João',
      surname: 'Pugliesi',
      email: 'mrlanguages62@gmail.com',
      password: 'Mrlanguages1234##',
      confirmPassword: 'Mrlanguages1234##',
    };
    // Act
    const response: Registered = await sut.execute({
      name,
      surname,
      email,
      password,
      confirmPassword
    });

    if (response instanceof InvalidUserConflictErrorResponse)
      console.log('error');

    // Assert
    if (!(response instanceof InvalidUserConflictErrorResponse)) {
      expect(response).toHaveProperty('mail_response');
      expect(response).toHaveProperty('login_response');
      expect(response.login_response).not.toBeInstanceOf(
        InvalidUserNotFoundErrorResponse
      );
      expect(response.login_response).not.toBeInstanceOf(
        InvalidPasswordIsNotEqualErrorResponse
      );
      expect(response.login_response).not.toBeInstanceOf(
        InvalidGenerateRefreshTokenErrorResponse
      );
    }
  });
});
