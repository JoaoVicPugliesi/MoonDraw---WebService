import { IRefreshAccessTokenFactoryInMemory } from "@application/factories/RefreshToken/RefreshAccessToken/IRefreshAccessTokenFactoryInMemory";
import { RefreshToken } from "@domain/entities/RefreshToken";
import { IRefreshAccessTokenDTO } from './IRefreshAccessTokenDTO';
import { InvalidRefreshTokenNotFoundErrorResponse, InvalidRefreshTokenUserNotFoundErrorResponse, RefreshAccessTokenResponse } from "@application/handlers/UseCasesResponses/RefreshToken/IRefreshAccessTokenHandler";
import dayjs from "dayjs";
import { User } from "@domain/entities/User";

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
users.push(user);

const refreshTokens: RefreshToken[] = [];
const refreshToken: RefreshToken = {
    id: refreshTokens.length + 1,
    public_id: 'a09d22d2-2464-42e3-827c-fe73626ff8b6',
    expires_in: 1744199538,
    user_id: 'a795c246-ca3b-46d0-8f66-b7ffef395b42'
}

refreshTokens.push(refreshToken);

describe('I refresh access token use case', () => {
    it('should fail because refresh token does not exist', async () => {
        // Arrange
        const refreshTokensSpliced = refreshTokens.toSpliced(0)
        const iRefreshAccessTokenFactoryInMemory = new IRefreshAccessTokenFactoryInMemory(users, refreshTokensSpliced);
        const sut = iRefreshAccessTokenFactoryInMemory.compose();
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
        const sut = iRefreshAccessTokenFactoryInMemory.compose();
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
        const sut = iRefreshAccessTokenFactoryInMemory.compose();
        // Act
        const DTO: IRefreshAccessTokenDTO = {
            public_id: 'a09d22d2-2464-42e3-827c-fe73626ff8b6'
        }
        const refreshed: RefreshAccessResponse = await sut.execute(DTO)
        // Assert
        expect(refreshed).not.toBeInstanceOf(InvalidRefreshTokenUserNotFoundErrorResponse);
        expect(refreshed).not.toBeInstanceOf(InvalidRefreshTokenNotFoundErrorResponse);
        expect(refreshed).toHaveProperty('access_token');
        console.log(refreshed);
    });

    it('should refresh the access token and renovate the refresh token successfully', async () => {
        // Arrange
        refreshToken.expires_in = dayjs().add(0, 'seconds').unix();
        const iRefreshAccessTokenFactoryInMemory = new IRefreshAccessTokenFactoryInMemory(users, refreshTokens);
        const sut = iRefreshAccessTokenFactoryInMemory.compose();
        // Act
        const DTO: IRefreshAccessTokenDTO = {
            public_id: 'a09d22d2-2464-42e3-827c-fe73626ff8b6'
        }
        const refreshed: RefreshAccessResponse = await sut.execute(DTO)
        // Assert
        expect(refreshed).not.toBeInstanceOf(InvalidRefreshTokenUserNotFoundErrorResponse);
        expect(refreshed).not.toBeInstanceOf(InvalidRefreshTokenNotFoundErrorResponse);
        expect(refreshed).toHaveProperty('access_token');
        expect(refreshed).toHaveProperty('refresh_token');
        console.log(refreshed);
    });
});