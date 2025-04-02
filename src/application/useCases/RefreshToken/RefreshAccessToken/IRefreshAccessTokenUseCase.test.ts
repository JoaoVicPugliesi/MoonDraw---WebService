import { IRefreshAccessTokenFactoryInMemory } from "@application/factories/RefreshToken/RefreshAccessToken/IRefreshAccessTokenFactoryInMemory";
import { RefreshToken } from "@domain/entities/RefreshToken";
import { IRefreshAccessTokenDTO } from './IRefreshAccessTokenDTO';
import { InvalidRefreshTokenNotFoundResponse, RefreshAccessTokenResponse } from "@application/handlers/RefreshToken/IRefreshAccessTokenHandler";
import dayjs from "dayjs";

const refreshTokens: RefreshToken[] = [];
const refreshToken: RefreshToken = {
    id: refreshTokens.length + 1,
    public_id: 'a09d22d2-2464-42e3-827c-fe73626ff8b6',
    expires_in: 1744199538,
    user_id: 'a795c246-ca3b-46d0-8f66-b7ffef395b42'
}
const expiresIn: number = dayjs().add(0, 'seconds').unix();
const refreshToken2: RefreshToken = {
    id: refreshTokens.length + 1,
    public_id: 'a09d23d2-2464-42e3-827c-fe73626ff8b6',
    expires_in: expiresIn,
    user_id: 'a795c246-ca3b-46d0-8f67-b7ffef395b42'
}
refreshTokens.push(refreshToken);
refreshTokens.push(refreshToken2);

describe('I refresh access token use case', () => {
    it('should fail because refresh token does not exist', async () => {
        // Arrange
        const refreshTokensSpliced = refreshTokens.toSpliced(0)
        const iRefreshAccessTokenFactoryInMemory = new IRefreshAccessTokenFactoryInMemory(refreshTokensSpliced);
        const sut = iRefreshAccessTokenFactoryInMemory.compose();
        // Act
        const DTO: IRefreshAccessTokenDTO = {
            public_id: 'a09d22d2-2464-42e3-827c-fe73626ff8b6'
        }
        const refreshed: InvalidRefreshTokenNotFoundResponse | RefreshAccessTokenResponse = await sut.execute(DTO)
        // Assert
        expect(refreshed).toBeInstanceOf(InvalidRefreshTokenNotFoundResponse);
    });

    it('should refresh the access token successfully', async () => {
        // Arrange
        const iRefreshAccessTokenFactoryInMemory = new IRefreshAccessTokenFactoryInMemory(refreshTokens);
        const sut = iRefreshAccessTokenFactoryInMemory.compose();
        // Act
        const DTO: IRefreshAccessTokenDTO = {
            public_id: 'a09d22d2-2464-42e3-827c-fe73626ff8b6'
        }
        const refreshed: InvalidRefreshTokenNotFoundResponse | RefreshAccessTokenResponse = await sut.execute(DTO)
        // Assert
        expect(refreshed).not.toBeInstanceOf(InvalidRefreshTokenNotFoundResponse);
        expect(refreshed).toHaveProperty('access_token');
        console.log(refreshed);
    });

    it('should refresh the access token and renovate the refresh token successfully', async () => {
        // Arrange
        const iRefreshAccessTokenFactoryInMemory = new IRefreshAccessTokenFactoryInMemory(refreshTokens);
        const sut = iRefreshAccessTokenFactoryInMemory.compose();
        // Act
        const DTO: IRefreshAccessTokenDTO = {
            public_id: 'a09d23d2-2464-42e3-827c-fe73626ff8b6'
        }
        const refreshed: InvalidRefreshTokenNotFoundResponse | RefreshAccessTokenResponse = await sut.execute(DTO)
        // Assert
        expect(refreshed).not.toBeInstanceOf(InvalidRefreshTokenNotFoundResponse);
        expect(refreshed).toHaveProperty('access_token');
        expect(refreshed).toHaveProperty('refresh_token');
        console.log(refreshed);
    });
});