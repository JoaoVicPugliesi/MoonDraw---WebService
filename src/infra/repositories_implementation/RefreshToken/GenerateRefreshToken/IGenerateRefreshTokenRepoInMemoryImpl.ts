import dayjs from 'dayjs';
import { IGenerateRefreshTokenDTO } from '@application/useCases/RefreshToken/GenerateRefreshToken/IGenerateRefreshTokenDTO';
import { RefreshToken } from '@domain/entities/RefreshToken';
import { IGenerateRefreshTokenRepo } from '@domain/repositories/RefreshToken/IGenerateRefreshTokenRepo';
import { randomUUID } from 'crypto';

export class IGenerateRefreshTokenRepoInMemoryImpl implements IGenerateRefreshTokenRepo {

    constructor(
        private readonly refreshTokens: RefreshToken[],
    ) {}

    findRelatedRefreshTokens<T>(param: T): Promise<RefreshToken | RefreshToken[] | null> {
        return new Promise((resolve, reject) => {
            const refreshTokens: RefreshToken | RefreshToken[] | null = this.refreshTokens.filter((refreshToken) => refreshToken.user_id === param as string);

            if(refreshTokens) resolve(refreshTokens);
            
            resolve(null);
        });
    }

    deleteRelatedRefreshTokens<T>(param: T): Promise<void> {
        return new Promise((resolve) => {
            for (let i = this.refreshTokens.length - 1; i >= 0; i--) {
                if (this.refreshTokens[i].user_id === param as string) {
                    this.refreshTokens.splice(i, 1); 
                }
            }
            resolve();
        });
    }
    

    saveRefreshToken({ user_id }: IGenerateRefreshTokenDTO): Promise<RefreshToken | null> {
        const expiresIn: number = dayjs().add(7, 'days').unix();
        return new Promise((resolve, reject) => {
            const refreshToken: RefreshToken = {
                id: this.refreshTokens.length + 1,
                public_id: randomUUID(),
                expires_in: expiresIn,
                user_id: user_id
            }

            this.refreshTokens.push(refreshToken);

            resolve(refreshToken);
        });
    }
}