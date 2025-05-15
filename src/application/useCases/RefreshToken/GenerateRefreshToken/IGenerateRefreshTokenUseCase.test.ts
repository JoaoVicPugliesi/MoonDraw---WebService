import { IGenerateRefreshTokenUseCase } from './IGenerateRefreshTokenUseCase';
import { GenerateRefreshTokenErrorResponse, IGenerateRefreshTokenDTO, IGenerateRefreshTokenResponse } from './IGenerateRefreshTokenDTO';
import { RefreshToken } from '@domain/entities/RefreshToken';
import { IGenerateRefreshTokenFactoryInMemory } from '@application/factories/RefreshToken/GenerateRefreshToken/IGenerateRefreshTokenInMemory';

describe('I generate refresh token use case', () => {
  const refreshTokens: RefreshToken[] = [];
  it('should generate a refresh token successfully', async () => {
    // Arrange
    const iGenerateRefreshTokenFactory = new IGenerateRefreshTokenFactoryInMemory(refreshTokens);
    const sut: IGenerateRefreshTokenUseCase = iGenerateRefreshTokenFactory.compose();
    const userId: string = '56d7ff79-f16d-434b-9183-5b0db27fa4e2';
    const { owner_id }: IGenerateRefreshTokenDTO = {
      owner_id: userId,
    };
    // Act
    const response: IGenerateRefreshTokenResponse = await sut.execute({ 
        owner_id 
    });
    // Assert
    if (response instanceof GenerateRefreshTokenErrorResponse) {
        return console.log('error generating refresh token');
    }
    expect(response.refreshToken).toHaveProperty('id');
    expect(response.refreshToken).toHaveProperty('public_id');
    expect(response.refreshToken).toHaveProperty('expires_in');
    expect(response.refreshToken.owner_id).toBe(userId);
  });
  it('should delete all user related refresh tokens and create a new one', async () => {
    // Arrange
    const iGenerateRefreshTokenFactory = new IGenerateRefreshTokenFactoryInMemory(refreshTokens);
    const sut: IGenerateRefreshTokenUseCase = iGenerateRefreshTokenFactory.compose();
    const userId: string = '56d7ff79-f16d-434b-9183-5b0db27fa4e2';
    const {
        owner_id
    }: IGenerateRefreshTokenDTO = {
      owner_id: userId,
    };

    // Act
    const response: IGenerateRefreshTokenResponse = await sut.execute({
        owner_id
      });
    if (response instanceof GenerateRefreshTokenErrorResponse) {
        return console.log('error');
    }
    const refreshTokensRelatedToCurrentUser = refreshTokens.filter(
      (refreshToken) => refreshToken.owner_id === userId
    );

    // Assert
    expect(refreshTokensRelatedToCurrentUser).toHaveLength(1);
  });
});
