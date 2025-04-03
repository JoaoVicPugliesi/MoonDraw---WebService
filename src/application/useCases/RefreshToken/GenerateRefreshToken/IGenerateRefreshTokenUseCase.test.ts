import { IGenerateRefreshTokenRepoImplInMemory } from '@infra/repositories_implementation/RefreshToken/GenerateRefreshToken/IGenerateRefreshTokenRepoImplInMemory';
import { IGenerateRefreshTokenUseCase } from './IGenerateRefreshTokenUseCase';
import { InvalidGenerateRefreshTokenErrorResponse } from '@application/handlers/UseCasesReponses/RefreshToken/IGenerateRefreshTokenHandler';
import { IGenerateRefreshTokenDTO } from './IGenerateRefreshTokenDTO';
import { RefreshToken } from '@domain/entities/RefreshToken';


describe('I generate refresh token use case', () => {
    const refreshTokens: RefreshToken[] = [];
    it('should generate a refresh token successfully', async () => {
        // Arrange
        const iGenerateRefreshTokenRepo = new IGenerateRefreshTokenRepoImplInMemory(refreshTokens);
        const sut: IGenerateRefreshTokenUseCase = new IGenerateRefreshTokenUseCase(iGenerateRefreshTokenRepo);
        const userId: string = '56d7ff79-f16d-434b-9183-5b0db27fa4e2';
        const DTO: IGenerateRefreshTokenDTO = {
            user_id: userId
        }
        // Act
        const refreshToken: InvalidGenerateRefreshTokenErrorResponse | RefreshToken = await sut.execute(DTO);

        // Assert

        console.log(refreshTokens);
        if(refreshToken instanceof InvalidGenerateRefreshTokenErrorResponse) return console.log('error generating refresh token');
        expect(refreshToken).toHaveProperty('id');
        expect(refreshToken).toHaveProperty('public_id');
        expect(refreshToken).toHaveProperty('expires_in');
        expect(refreshToken.user_id).toBe(userId);
        console.log(refreshTokens);
        console.log(refreshToken);
    });
    it('should delete all user related refresh tokens and create a new one', async () => {
         // Arrange
         const iGenerateRefreshTokenRepo = new IGenerateRefreshTokenRepoImplInMemory(refreshTokens);
         const sut: IGenerateRefreshTokenUseCase = new IGenerateRefreshTokenUseCase(iGenerateRefreshTokenRepo);
         const userId: string = '56d7ff79-f16d-434b-9183-5b0db27fa4e2';
         const DTO: IGenerateRefreshTokenDTO = {
             user_id: userId
         }
         // Act
        const refreshToken: InvalidGenerateRefreshTokenErrorResponse | RefreshToken = await sut.execute(DTO);
        if(refreshToken instanceof InvalidGenerateRefreshTokenErrorResponse) return console.log('error');
        
        const refreshTokensRelatedToCurrentUser = refreshTokens.filter((refreshToken) => refreshToken.user_id === userId);
        
        // Assert
         
        expect(refreshTokensRelatedToCurrentUser).toHaveLength(1);
        console.log(refreshTokens);
        console.log(refreshToken);
    })
});