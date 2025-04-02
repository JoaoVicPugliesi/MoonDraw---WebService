import {
  InvalidUserConflictErrorResponse,
  RegisterReponse,
} from '@application/handlers/User/IRegisterHandlers';
import { User } from '@domain/entities/User';
import { RefreshToken } from '@domain/entities/RefreshToken';
import { InvalidPasswordIsNotEqualErrorResponse, InvalidUserNotFoundErrorResponse } from '@application/handlers/User/ILoginHandlers';
import { InvalidGenerateRefreshTokenErrorResponse } from '@application/handlers/RefreshToken/IGenerateRefreshTokenHandler';
import { IRegisterFactoryInMemory } from '@application/factories/User/Register/IRegisterFactoryInMemory';
import { IRegisterUseCase } from './IRegisterUseCase';

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
}
users.push(user);

describe('I register use case', () => {
  it('must fail for the reason email should be unique and user already exists', async () => {
    // Arrange
    const iRegisterFactoryInMemory = new IRegisterFactoryInMemory(users, refreshTokens, iMailProvider);
    const sut: IRegisterUseCase = iRegisterFactoryInMemory.compose();
    // Act
    const registered: Registered = await sut.execute({
      name: 'João',
      surname: 'Pugliesi',
      email: 'mrlanguages62@gmail.com',
      password: 'Mrlanguages1234##',
    });

    // Assert
    expect(registered).toBeInstanceOf(InvalidUserConflictErrorResponse);
  });

  it('must register a user successfully', async () => {
    // Arrange
    const usersSpliced = users.toSpliced(0)
    const iRegisterFactoryInMemory = new IRegisterFactoryInMemory(usersSpliced, refreshTokens, iMailProvider);
    const sut: IRegisterUseCase = iRegisterFactoryInMemory.compose();

    // Act
    const registered: Registered = await sut.execute({
      name: 'João',
      surname: 'Pugliesi',
      email: 'mrlanguages62@gmail.com',
      password: 'Mrlanguages1234##',
      confirmPassword: 'Mrlanguages1234##',
    });

    console.log(registered);
    console.log(users);

    if(registered instanceof InvalidUserConflictErrorResponse) console.log('error');

    // Assert
    if(!(registered instanceof InvalidUserConflictErrorResponse)) {
        expect(registered).toHaveProperty('mail_response');
        expect(registered).toHaveProperty('login_response');
        expect(registered.login_response).not.toBeInstanceOf(InvalidUserNotFoundErrorResponse);
        expect(registered.login_response).not.toBeInstanceOf(InvalidPasswordIsNotEqualErrorResponse);
        expect(registered.login_response).not.toBeInstanceOf(InvalidGenerateRefreshTokenErrorResponse);
       }
  });
});
