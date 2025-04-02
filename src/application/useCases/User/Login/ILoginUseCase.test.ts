import { RefreshToken } from '@domain/entities/RefreshToken';
import { IGenerateRefreshTokenRepoImplInMemory } from '@infra/repositories_implementation/RefreshToken/GenerateRefreshToken/IGenerateRefreshTokenRepoImplInMemory';
import { ILoginUseCase } from './ILoginUseCase';
import { User } from '@domain/entities/User';
import { IGenerateRefreshTokenUseCase } from '@application/useCases/RefreshToken/GenerateRefreshToken/IGenerateRefreshTokenUseCase';
import { IJWTTokenServiceImpl } from '@infra/services_implementation/IJWTTokenServiceImpl';
import { IBcryptHashServiceImpl } from '@infra/services_implementation/IBcryptHashServiceImpl';
import {
  InvalidPasswordIsNotEqualError,
  InvalidUserNotFoundError,
  LoginResponse,
} from '@application/handlers/User/ILoginHandlers';
import { InvalidGenerateRefreshToken } from '@application/handlers/RefreshToken/IGenerateRefreshTokenHandler';
import { ILoginRepoImplInMemory } from '@infra/repositories_implementation/User/Login/ILoginRepoImplInMemory';

type Logged = | InvalidUserNotFoundError
| InvalidPasswordIsNotEqualError
| InvalidGenerateRefreshToken
| LoginResponse

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

describe('I login use case', () => {
   // super arrange

  it('should fail because there is no user registered matching DTO.email provided', async () => {
    // arrange
    const usersSpliced = users.toSpliced(0);
    const iHashService = new IBcryptHashServiceImpl();
    const iTokenService = new IJWTTokenServiceImpl();
    const iGenerateRefreshTokenRepo = new IGenerateRefreshTokenRepoImplInMemory(
      refreshTokens
    );
    const iGenerateRefreshTokenUseCase = new IGenerateRefreshTokenUseCase(
      iGenerateRefreshTokenRepo
    );
    const iLoginRepo = new ILoginRepoImplInMemory(usersSpliced);
    const sut = new ILoginUseCase(
      iLoginRepo,
      iHashService,
      iTokenService,
      iGenerateRefreshTokenUseCase
    );

    // act
    const logged: Logged = await sut.execute({
      email: 'mrlanguages62@gmail.com',
      password: 'Mrlanguages1234##',
    });

    // assert

    expect(logged instanceof InvalidUserNotFoundError);
  });
  it('should fail because DTO.password provided does not match user.password found', async () => {
    // arrange
    const iHashService = new IBcryptHashServiceImpl();
    const iTokenService = new IJWTTokenServiceImpl();
    const iGenerateRefreshTokenRepo = new IGenerateRefreshTokenRepoImplInMemory(
      refreshTokens
    );
    const iGenerateRefreshTokenUseCase = new IGenerateRefreshTokenUseCase(
      iGenerateRefreshTokenRepo
    );
    const iLoginRepo = new ILoginRepoImplInMemory(users);
    const sut = new ILoginUseCase(
      iLoginRepo,
      iHashService,
      iTokenService,
      iGenerateRefreshTokenUseCase
    );

    // act
    const logged: Logged = await sut.execute({
      email: 'mrlanguages62@gmail.com',
      password: 'mrlanguages1234##',
    });

    // assert

    expect(logged instanceof InvalidPasswordIsNotEqualError);
  });
  it('should login the user successfully', async () => {
    // arrange
    const iHashService = new IBcryptHashServiceImpl();
    const iTokenService = new IJWTTokenServiceImpl();
    const iGenerateRefreshTokenRepo = new IGenerateRefreshTokenRepoImplInMemory(
      refreshTokens
    );
    const iGenerateRefreshTokenUseCase = new IGenerateRefreshTokenUseCase(
      iGenerateRefreshTokenRepo
    );
    const iLoginRepo = new ILoginRepoImplInMemory(users);
    const sut = new ILoginUseCase(
      iLoginRepo,
      iHashService,
      iTokenService,
      iGenerateRefreshTokenUseCase
    );

    // act
    const logged: Logged = await sut.execute({
      email: 'mrlanguages62@gmail.com',
      password: 'Mrlanguages1234##',
    });

    // assert
    expect(logged).toHaveProperty('access_token');
    expect(logged).toHaveProperty('refresh_token');
    console.log(logged);
  });
});
