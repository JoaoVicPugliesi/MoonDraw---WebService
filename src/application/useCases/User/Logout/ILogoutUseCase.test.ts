import { ILogOutFactoryInMemory } from '@application/factories/User/Logout/ILogoutFactoryInMemory';
import { ILogoutUseCase } from './ILogoutUseCase';
import { RefreshToken } from '@domain/entities/RefreshToken';
import {
  ILogoutDTO,
  ILogoutResponse,
  RefreshTokenNotFoundErrorResponse,
} from './ILogoutDTO';
import { randomUUID } from 'crypto';

const refreshTokens: RefreshToken[] = [];
const refreshToken: RefreshToken = {
    id: refreshTokens.length + 1,
    public_id: randomUUID(),
    expires_in: 123212,
    owner_id: randomUUID()
}
describe('Should analyse every possible end related to logging out', () => {
  it('must fail because refresh token was not found', async () => {
    // Arrange (Given)
    const iFactory = new ILogOutFactoryInMemory(refreshTokens);
    const sut: ILogoutUseCase = iFactory.compose();
    const { public_id }: ILogoutDTO = {
      public_id: refreshToken.public_id + 'aisais',
    };
    // Act (When)
    const response: ILogoutResponse = await sut.execute({
      public_id,
    });
    // Assert (Then)
    expect(response).toBeInstanceOf(RefreshTokenNotFoundErrorResponse);
    expect(response).not.toHaveProperty('success');
  });
  it('must logout successfully', async () => {
    // Arrange (Given)
    const iFactory = new ILogOutFactoryInMemory(refreshTokens);
    const sut: ILogoutUseCase = iFactory.compose();
    const { public_id }: ILogoutDTO = {
      public_id: refreshToken.public_id,
    };
    // Act (When)
    const response: ILogoutResponse = await sut.execute({
      public_id,
    });
    // Assert (Then)
    expect(response).toBeInstanceOf(RefreshTokenNotFoundErrorResponse);
    expect(response).not.toHaveProperty('success');
  });
});
