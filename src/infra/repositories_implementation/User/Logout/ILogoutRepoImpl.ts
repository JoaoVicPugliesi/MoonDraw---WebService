import { RefreshToken } from '@domain/entities/RefreshToken';
import { ILogoutRepo } from '@domain/repositories/User/ILogoutRepo';
import { prisma } from '@infra/db/Prisma';

export class ILogoutRepoImpl implements ILogoutRepo {
  async findRefreshToken<T>(param: T): Promise<RefreshToken | null> {
    const refreshToken: RefreshToken | null =
      await prisma.refreshToken.findFirst({
        where: {
          public_id: param as string,
        },
      });

    if (!refreshToken) return null;

    return refreshToken;
  }

  async deleteRelatedRefreshTokens<T>(param: T): Promise<void> {
    await prisma.refreshToken.deleteMany({
      where: {
        user_id: param as string,
      },
    });
  }
}
