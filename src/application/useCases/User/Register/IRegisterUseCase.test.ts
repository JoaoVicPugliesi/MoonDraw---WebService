import {
  UserConflictErrorResponse,
} from '@application/handlers/UseCasesResponses/User/IRegisterHandlers';
import { User } from '@domain/entities/User';
import { RefreshToken } from '@domain/entities/RefreshToken';
import { IRegisterFactoryInMemory } from '@application/factories/User/Register/IRegisterFactoryInMemory';
import { IRegisterUseCase } from './IRegisterUseCase';
import { configDotenv } from 'dotenv';
import { IRegisterDTO } from './IRegisterDTO';
import { Cart } from '@domain/entities/Cart';
configDotenv();

// Mocks
const iMailProvider = { sendMail: jest.fn() };

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
  is_verified: false,
  created_at: new Date(),
  last_login_at: new Date(),
  email_verified_at: null,
};
users.push(user);

const carts: Cart[] = [];

describe('I register use case', () => {
  it('must fail for the reason email should be unique and user already exists', async () => {
    // Arrange
    const iRegisterFactoryInMemory = new IRegisterFactoryInMemory(
      users,
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
    const response: UserConflictErrorResponse | void = await sut.execute({
      name,
      surname,
      email,
      password,
      confirmPassword
    });

    // Assert
    expect(response).toBeInstanceOf(UserConflictErrorResponse);
  });

  it('must register a user successfully', async () => {
    // Arrange
    const usersSpliced = users.toSpliced(0);
    const iRegisterFactoryInMemory = new IRegisterFactoryInMemory(
      usersSpliced,
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
    const response: UserConflictErrorResponse | void = await sut.execute({
      name,
      surname,
      email,
      password,
      confirmPassword
    });

    // Assert 
    expect(response).not.toBeInstanceOf(UserConflictErrorResponse);
  });
});
