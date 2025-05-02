import { RefreshToken } from '@domain/entities/RefreshToken';
import { v4 as uuidv4 } from 'uuid';
import { IRefreshTokenRepository } from '@domain/repositories/IRefreshTokenRepository';
import { IGenerateRefreshTokenDTO } from '@application/useCases/RefreshToken/GenerateRefreshToken/IGenerateRefreshTokenDTO';
import dayjs from 'dayjs';

export class IRefreshTokenRepositoryInMemoryImpl implements IRefreshTokenRepository {
  constructor(
    private readonly refreshTokens: RefreshToken[]
  ) {}

  findRelatedRefreshTokens<T>(
    param: T
  ): Promise<RefreshToken | RefreshToken[] | null> {
    return new Promise((resolve, reject) => {
      const refreshTokens: RefreshToken | RefreshToken[] | null =
        this.refreshTokens.filter(
          (refreshToken) => refreshToken.owner_id === (param as string)
        );

      if (refreshTokens) resolve(refreshTokens);

      resolve(null);
    });
  }
  async findRefreshToken<T>(param: T): Promise<RefreshToken | null> {
    return new Promise((resolve, reject) => {
      const refreshToken: RefreshToken | undefined = this.refreshTokens.find(
        (refreshToken) => refreshToken.public_id === (param as string)
      );

      if (refreshToken) return resolve(refreshToken);

      return resolve(null);
    });
  }

  async deleteRelatedRefreshTokens<T>(param: T): Promise<void> {
    return new Promise((resolve, reject) => {
      for (let i = this.refreshTokens.length - 1; i >= 0; i--) {
        if (this.refreshTokens[i].owner_id === (param as string)) {
          this.refreshTokens.splice(i, 1);
        }
      }

      resolve();
    });
  }

  saveRefreshToken({
    owner_id,
    }: IGenerateRefreshTokenDTO): Promise<RefreshToken | null> {
      const expiresIn: number = dayjs().add(7, 'days').unix();
      return new Promise((resolve, reject) => {
        const refreshToken: RefreshToken = {
          id: this.refreshTokens.length + 1,
          public_id: uuidv4(),
          expires_in: expiresIn,
          owner_id:owner_id,
        };
  
        this.refreshTokens.push(refreshToken);
  
        return resolve(refreshToken);
      });
    }
}
