import { User } from '@domain/entities/User';
import { IRegisterFactoryInMemory } from '@application/factories/User/Register/IRegisterFactoryInMemory';
import { IRegisterUseCase } from './IRegisterUseCase';
import {
  IRegisterDTO,
  IRegisterResponse,
  UserConflictErrorResponse,
  UserProcessingConflictErrorResponse,
} from './IRegisterDTO';
import { configDotenv } from 'dotenv';
configDotenv()
// Mocks
const iMailProvider = { sendMail: jest.fn() };
const users: User[] = [];
const user: User = {
  id: users.length + 1,
  icon_id: 'ashaius91919wh19wh9',
  public_id: '56d7ff79-f16d-434b-9183-5b0db27fa4e2',
  name: 'João',
  surname: 'Pugliesi',
  email: 'mrlanguages62@gmail.com',
  description: 'saioshaohhd8dh9a0hda9hs9a',
  password: '12345678',
  role: 'Buyer',
  is_email_verified: false,
  created_at: new Date(),
  last_login_at: new Date(),
  email_verified_at: null,
};
users.push(user);

describe('Should analyse every possible end related to registering on our system', () => {
  it('must fail for the reason email should be unique and user already exists', async () => {
    // Arrange
    const iRegisterFactoryInMemory = new IRegisterFactoryInMemory(
      users,
      iMailProvider
    );
    const sut: IRegisterUseCase = iRegisterFactoryInMemory.compose();
    const {
      icon_id,
      name,
      surname,
      email,
      role,
      description,
      password,
      confirmPassword,
    }: IRegisterDTO = {
      icon_id: 'asaioshaiosh919',
      name: 'João',
      surname: 'Pugliesi',
      email: 'mrlanguages62@gmail.com',
      role: 'Buyer',
      description: 'I am an artist',
      password: 'Mrlanguages1234##',
      confirmPassword: 'Mrlanguages1234##',
    };
    // Act
    const response:
    | UserConflictErrorResponse
    | UserProcessingConflictErrorResponse
    | IRegisterResponse = await sut.execute({
      icon_id,
      name,
      surname,
      email,
      role,
      description,
      password,
      confirmPassword,
    });
    // Assert
    expect(response).toBeInstanceOf(UserConflictErrorResponse);
    expect(response).not.toHaveProperty('temporary_access_token');
  });

  it('must register a user successfully', async () => {
    // Arrange
    const usersSpliced = users.toSpliced(0);
    const iRegisterFactoryInMemory = new IRegisterFactoryInMemory(
      usersSpliced,
      iMailProvider
    );
    const sut: IRegisterUseCase = iRegisterFactoryInMemory.compose();
    const {
      icon_id,
      name,
      surname,
      email,
      role,
      description,
      password,
      confirmPassword,
    }: IRegisterDTO = {
      icon_id: 'a8s9a9sy82shasq8',
      name: 'João',
      surname: 'Pugliesi',
      email: 'mrlanguages62@gmail.com',
      description: 'I am an artist',
      role: 'Buyer',
      password: 'Mrlanguages1234##',
      confirmPassword: 'Mrlanguages1234##',
    };
    // Act
    const response:
      | UserConflictErrorResponse
      | UserProcessingConflictErrorResponse
      | IRegisterResponse
      | void = await sut.execute({
      icon_id,
      name,
      surname,
      email,
      description,
      role,
      password,
      confirmPassword,
    });
    // Assert
    expect(response).not.toBeInstanceOf(UserConflictErrorResponse);
    expect(response).toHaveProperty('temporary_access_token');
  });
});
