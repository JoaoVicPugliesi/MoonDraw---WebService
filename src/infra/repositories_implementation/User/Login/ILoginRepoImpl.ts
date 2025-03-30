import { User } from '@domain/entities/User';
import { ILoginRepo } from '@domain/repositories/User/ILoginRepo';
import { prisma } from '@infra/db/Prisma';

export class ILoginRepoImpl implements ILoginRepo {
    async findUser<T>(param: T): Promise<User | null> {
        const isUser: User | null = await prisma.user.findFirst({
          where: {
            email: param as string,
          },
        });
    
        if (!isUser) {
          return null;
        }
    
        return isUser;
      }
}