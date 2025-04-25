import { RefreshToken } from '@domain/entities/RefreshToken';
import { ILoginUseCase } from './ILoginUseCase';
import { User } from '@domain/entities/User';
import {
  InvalidUserNotFoundErrorResponse,
  InvalidPasswordIsNotEqualErrorResponse,
  ILoginResponse,
} from '@application/handlers/UseCasesResponses/User/ILoginHandlers';
import { InvalidGenerateRefreshTokenErrorResponse } from '@application/handlers/UseCasesResponses/RefreshToken/IGenerateRefreshTokenHandler';
import { ILoginFactoryInMemory } from '@application/factories/User/Login/ILoginFactoryInMemory';
import { configDotenv } from 'dotenv';
import { ILoginDTO } from './ILoginDTO';
configDotenv();

type Logged =
  | InvalidUserNotFoundErrorResponse
  | InvalidPasswordIsNotEqualErrorResponse
  | InvalidGenerateRefreshTokenErrorResponse
  | ILoginResponse;

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
  last_login_at: new Date(),
  email_verified_at: null,
};
users.push(user);

describe('I login use case', () => {
  it('should fail because there is no user registered matching DTO.email provided', async () => {
    // Arrange
    const usersSpliced = users.toSpliced(0);
    const iLoginFactory = new ILoginFactoryInMemory(
      usersSpliced,
      refreshTokens
    );
    const sut: ILoginUseCase = iLoginFactory.compose();
    const { email, password }: ILoginDTO = {
      email: 'mrlanguages62@gmail.com',
      password: 'Mrlanguages1234##',
    };
    // Act
    const response: Logged = await sut.execute({
      email,
      password,
    });

    // Assert
    expect(response).toBeInstanceOf(InvalidUserNotFoundErrorResponse);
  });
  it('should fail because DTO.password provided does not match user.password found', async () => {
    // Arrange
    const iLoginFactory = new ILoginFactoryInMemory(users, refreshTokens);
    const sut: ILoginUseCase = iLoginFactory.compose();
    const { email, password }: ILoginDTO = {
      email: 'mrlanguages62@gmail.com',
      password: 'mrlanguages1234##',
    };

    // Act
    const response: Logged = await sut.execute({
      email,
      password,
    });

    // Assert
    expect(response).toBeInstanceOf(InvalidPasswordIsNotEqualErrorResponse);
  });
  it('should login the user successfully', async () => {
    // Arrange
    const iLoginFactory = new ILoginFactoryInMemory(users, refreshTokens);
    const sut: ILoginUseCase = iLoginFactory.compose();

    // Act
    const response: Logged = await sut.execute({
      email: 'mrlanguages62@gmail.com',
      password: 'Mrlanguages1234##',
    });

    // Assert
    expect(response).toHaveProperty('access_token');
    expect(response).toHaveProperty('refresh_token');
    console.log(response);
  });
});
