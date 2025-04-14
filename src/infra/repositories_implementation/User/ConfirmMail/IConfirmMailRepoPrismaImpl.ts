import { User } from "@domain/entities/User";
import { prisma } from "@infra/db/Prisma";
import { IConfirmMailRepo } from "@domain/repositories/User/IConfirmMailRepo";

export class IConfirmMailRepoPrismaImpl implements IConfirmMailRepo {
  async findUser<T>(param: T): Promise<boolean> {
    const user: User | null = await prisma.user.findFirst({
      where: {
        email: param as string,
      },
    });

    if (!user) return false;

    return true;
  }

  async activateUser<T>(param: T): Promise<void> {
    await prisma.user.update({
      where: {
        email: param as string,
      },
      data: {
        is_active: true,
        email_verified_at: new Date(),
      },
    });
  }
}
