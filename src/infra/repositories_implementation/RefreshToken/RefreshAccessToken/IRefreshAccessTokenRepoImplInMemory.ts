import { RefreshToken } from '@domain/entities/RefreshToken';
import { User } from '@domain/entities/User';
import { IRefreshAccessTokenRepo } from '@domain/repositories/RefreshToken/IRefreshAccessTokenRepo';

export class IRefreshAccessTokenRepoImplInMemory implements IRefreshAccessTokenRepo
{
  constructor(
    private readonly users: User[],
    private readonly refreshTokens: RefreshToken[]
  ) {}

  async findRefreshToken<T>(param: T): Promise<RefreshToken | null> {
    return new Promise((resolve, reject) => {
      const refreshToken: RefreshToken | undefined = this.refreshTokens.find(
        (refreshToken) => refreshToken.public_id === (param as string)
      );

      if (refreshToken) resolve(refreshToken);

      resolve(null);
    });
  }

  async findRefreshTokenUser<T>(param: T): Promise<User | null> {
      return new Promise((resolve, reject) => {
        const user: User | undefined = this.users.find((user) => user.public_id === param as string);

        if(user) resolve(user);

        resolve(null);
      });
  }

  async deleteRelatedRefreshTokens<T>(param: T): Promise<void> {
    return new Promise((resolve, reject) => {
      for (let i = this.refreshTokens.length - 1; i >= 0; i--) {
        if (this.refreshTokens[i].user_id === (param as string)) {
          this.refreshTokens.splice(i, 1);
        }
      }
      resolve();
    });
  }
}
