import { IRefreshAccessTokenFactoryInMemory } from '@application/factories/RefreshToken/RefreshAccessToken/IRefreshAccessTokenFactoryInMemory';
import { RefreshToken } from '@domain/entities/RefreshToken';
import { IRefreshAccessTokenDTO } from './IRefreshAccessTokenDTO';
import { InvalidRefreshTokenNotFoundErrorResponse, InvalidRefreshTokenUserNotFoundErrorResponse, RefreshAccessTokenResponse } from '@application/handlers/UseCasesResponses/RefreshToken/IRefreshAccessTokenHandler';
import dayjs from 'dayjs';
import { User } from '@domain/entities/User';
import { IRefreshAccessTokenUseCase } from './IRefreshAccessTokenUseCase';
import { configDotenv } from 'dotenv';
configDotenv()

type RefreshAccessResponse =  InvalidRefreshTokenNotFoundErrorResponse | InvalidRefreshTokenUserNotFoundErrorResponse | RefreshAccessTokenResponse;

const users: User[] = [];
const user: User = {
  id: users.length + 1,
  public_id: 'a795c246-ca3b-46d0-8f66-b7ffef395b42',
  name: 'João',
  surname: 'Pugliesi',
  email: 'mrlanguages62@gmail.com',
  password: '$2b$10$GX73JFHmigssj00i5mES9uak392P5wSrS6caNFaQ0ybZkm2TBuBkK',
  role: 'client',
  is_active: false,
  created_at: new Date(),
  email_verified_at: null,
};
const user2: User = {
  id: users.length + 1,
  public_id: 'a795c246-ca3b-46d0-8f66-b7ffef395b43',
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
users.push(user2);

const refreshTokens: RefreshToken[] = [];
const expiresIn = dayjs().add(10, 'days').unix();
const refreshToken: RefreshToken = {
    id: refreshTokens.length + 1,
    public_id: 'a09d22d2-2464-42e3-827c-fe73626ff8b6',
    expires_in: expiresIn,
    user_id: 'a795c246-ca3b-46d0-8f66-b7ffef395b42'
}

const expiresIn2 = dayjs().add(1, 'second').unix();

const refreshToken2: RefreshToken = {
    id: refreshTokens.length + 1,
    public_id: 'a09d22d2-2464-42e3-827c-fe73626ff8b8',
    expires_in: expiresIn2,
    user_id: 'a795c246-ca3b-46d0-8f66-b7ffef395b43'
}

refreshTokens.push(refreshToken);
refreshTokens.push(refreshToken2);

describe('I refresh access token use case', () => {
    it('should fail because refresh token does not exist', async () => {
        // Arrange
        const refreshTokensSpliced = refreshTokens.toSpliced(0)
        const iRefreshAccessTokenFactoryInMemory = new IRefreshAccessTokenFactoryInMemory(users, refreshTokensSpliced);
        const sut: IRefreshAccessTokenUseCase = iRefreshAccessTokenFactoryInMemory.compose();
        // Act
        const DTO: IRefreshAccessTokenDTO = {
            public_id: 'a09d22d2-2464-42e3-827c-fe73626ff8b6'
        }
        const refreshed: RefreshAccessResponse = await sut.execute(DTO)
        // Assert
        expect(refreshed).not.toBeInstanceOf(InvalidRefreshTokenUserNotFoundErrorResponse);
        expect(refreshed).toBeInstanceOf(InvalidRefreshTokenNotFoundErrorResponse);
    });

    it('should fail because user does not exist', async () => {
        // Arrange
        const usersSpliced = users.toSpliced(0)
        const iRefreshAccessTokenFactoryInMemory = new IRefreshAccessTokenFactoryInMemory(usersSpliced, refreshTokens);
        const sut: IRefreshAccessTokenUseCase = iRefreshAccessTokenFactoryInMemory.compose();
        // Act
        const DTO: IRefreshAccessTokenDTO = {
            public_id: 'a09d22d2-2464-42e3-827c-fe73626ff8b6'
        }
        const refreshed: RefreshAccessResponse = await sut.execute(DTO)
        // Assert
        expect(refreshed).toBeInstanceOf(InvalidRefreshTokenUserNotFoundErrorResponse);
        expect(refreshed).not.toBeInstanceOf(InvalidRefreshTokenNotFoundErrorResponse);
    });

    it('should refresh the access token successfully', async () => {
        // Arrange
        const iRefreshAccessTokenFactoryInMemory = new IRefreshAccessTokenFactoryInMemory(users, refreshTokens);
        const sut: IRefreshAccessTokenUseCase = iRefreshAccessTokenFactoryInMemory.compose();
        // Act
        const DTO: IRefreshAccessTokenDTO = {
            public_id: 'a09d22d2-2464-42e3-827c-fe73626ff8b6'
        }
        const refreshed: RefreshAccessResponse = await sut.execute(DTO)
        // Assert
        expect(refreshed).not.toBeInstanceOf(InvalidRefreshTokenUserNotFoundErrorResponse);
        expect(refreshed).not.toBeInstanceOf(InvalidRefreshTokenNotFoundErrorResponse);
        expect(refreshed).toHaveProperty('access_token');
    });

    it('should refresh the access token and renovate the refresh token successfully', async () => {
        // Arrange
        const iRefreshAccessTokenFactoryInMemory = new IRefreshAccessTokenFactoryInMemory(users, refreshTokens);
        const sut: IRefreshAccessTokenUseCase = iRefreshAccessTokenFactoryInMemory.compose();
        // Act
        const DTO: IRefreshAccessTokenDTO = {
            public_id: 'a09d22d2-2464-42e3-827c-fe73626ff8b8'
        }
        const refreshed: RefreshAccessResponse = await sut.execute(DTO)
        console.log(refreshed);
        // Assert
        expect(refreshed).not.toBeInstanceOf(InvalidRefreshTokenUserNotFoundErrorResponse);
        expect(refreshed).not.toBeInstanceOf(InvalidRefreshTokenNotFoundErrorResponse);
        expect(refreshed).toHaveProperty('access_token');
    });
});