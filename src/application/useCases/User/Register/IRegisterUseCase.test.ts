import {
  InvalidUserConflictError,
  RegisterReponse,
} from '@application/handlers/User/IRegisterHandlers';
import { User } from '@domain/entities/User';
import { IRegisterRepoImplInMemory } from '@infra/repositories_implementation/User/Register/IRegisterRepoImplInMemory';
import { IRegisterUseCase } from './IRegisterUseCase';
import { ILoginUseCase } from '../Login/ILoginUseCase';
import { ILoginRepoImplInMemory } from '@infra/repositories_implementation/User/Login/ILoginRepoImplInMemory';
import { IGenerateRefreshTokenUseCase } from '@application/useCases/RefreshToken/GenerateRefreshToken/IGenerateRefreshTokenUseCase';
import { IGenerateRefreshTokenRepoImplInMemory } from '@infra/repositories_implementation/RefreshToken/GenerateRefreshToken/IGenerateRefreshTokenRepoImplInMemory';
import { IJWTTokenServiceImpl } from '@infra/services_implementation/IJWTTokenServiceImpl';
import { IBcryptHashServiceImpl } from '@infra/services_implementation/IBcryptHashServiceImpl';
import { RefreshToken } from '@domain/entities/RefreshToken';
import { InvalidPasswordIsNotEqualError, InvalidUserNotFoundError } from '@application/handlers/User/ILoginHandlers';
import { InvalidGenerateRefreshToken } from '@application/handlers/RefreshToken/IGenerateRefreshTokenHandler';

// Mocks
const iMailProvider = { sendMail: jest.fn() };

type Registered = InvalidUserConflictError | RegisterReponse;
const users: User[] = [];
const refreshTokens: RefreshToken[] = [];
users.push({
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
});

describe('I register use case', () => {
  it('must fail for the reason email should be unique and user already exists', async () => {
    // Arrange
    const iHashService = new IBcryptHashServiceImpl();
    const iTokenService = new IJWTTokenServiceImpl();
    const iGenerateRefreshTokenRepo = new IGenerateRefreshTokenRepoImplInMemory(
      refreshTokens
    );
    const iGenerateRefreshTokenUseCase = new IGenerateRefreshTokenUseCase(
      iGenerateRefreshTokenRepo
    );
    const iLoginRepo = new ILoginRepoImplInMemory(users);
    const iLoginUseCase = new ILoginUseCase(
      iLoginRepo,
      iHashService,
      iTokenService,
      iGenerateRefreshTokenUseCase
    );
    const iRegisterUserRepoInMemory = new IRegisterRepoImplInMemory(users, iHashService);
    const sut = new IRegisterUseCase(
      iRegisterUserRepoInMemory,
      iMailProvider,
      iLoginUseCase
    );
    // Act
    const registered: Registered = await sut.execute({
      name: 'João',
      surname: 'Pugliesi',
      email: 'mrlanguages62@gmail.com',
      password: 'Mrlanguages1234##',
    });

    // Assert
    expect(registered).toBeInstanceOf(InvalidUserConflictError);
  });

  it('must register a user successfully', async () => {
    // Arrange
    const usersSpliced = users.toSpliced(0)
    const iHashService = new IBcryptHashServiceImpl();
    const iTokenService = new IJWTTokenServiceImpl();
    const iGenerateRefreshTokenRepo = new IGenerateRefreshTokenRepoImplInMemory(
      refreshTokens
    );
    const iGenerateRefreshTokenUseCase = new IGenerateRefreshTokenUseCase(
      iGenerateRefreshTokenRepo
    );
    const iLoginRepo = new ILoginRepoImplInMemory(usersSpliced);
    const iLoginUseCase = new ILoginUseCase(
      iLoginRepo,
      iHashService,
      iTokenService,
      iGenerateRefreshTokenUseCase
    );
    const iRegisterUserRepoInMemory = new IRegisterRepoImplInMemory(users, iHashService);
    const sut = new IRegisterUseCase(
      iRegisterUserRepoInMemory,
      iMailProvider,
      iLoginUseCase
    );

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

    if(registered instanceof InvalidUserConflictError) console.log('error');

    // Assert
    if(!(registered instanceof InvalidUserConflictError)) {
        expect(registered).toHaveProperty('mail_response');
        expect(registered).toHaveProperty('login_reponse');
        expect(registered.login_response).not.toBeInstanceOf(InvalidUserNotFoundError);
        expect(registered.login_response).not.toBeInstanceOf(InvalidPasswordIsNotEqualError);
        expect(registered.login_response).not.toBeInstanceOf(InvalidGenerateRefreshToken);
       }
  });
});
