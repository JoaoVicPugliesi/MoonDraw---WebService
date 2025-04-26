import { User } from '@domain/entities/User';
import { ILoginFactoryInMemory } from '@application/factories/User/Login/ILoginFactoryInMemory';
import { RefreshToken } from '@domain/entities/RefreshToken';
import { IRegisterUseCase } from '@application/useCases/User/Register/IRegisterUseCase';
import { IHashServiceBCryptImpl } from '@infra/services/IHashServiceBCryptImpl';
import { IUserRepositoryInMemoryImpl } from '@infra/repositories/User/IUserRepositoryInMemoryImpl';
import { IAssignCartOwnerFactoryInMemory } from '@application/factories/Cart/AssignCartOwner/IAssignCartOwnerFactoryInMemory';
import { Cart } from '@domain/entities/Cart';

export class IRegisterFactoryInMemory {
  constructor(
    private readonly users: User[],
    private readonly carts: Cart[],
    private readonly refreshTokens: RefreshToken[],
    private readonly iMailProvider: { sendMail: any }
  ) {}

  compose(): IRegisterUseCase {
    const iHashService = new IHashServiceBCryptImpl();
    const iLoginFactoryInMemory = new ILoginFactoryInMemory(this.users, this.refreshTokens)
    const iLoginUseCase = iLoginFactoryInMemory.compose();
    const iAssignCartOwnerFactoryInMemory = new IAssignCartOwnerFactoryInMemory(this.carts, this.users);
    const iAssignCartOwnerUseCase = iAssignCartOwnerFactoryInMemory.compose();
    const iUserRepository = new IUserRepositoryInMemoryImpl(
      this.users,
      iHashService
    );

    return new IRegisterUseCase(
      iUserRepository,
      this.iMailProvider,
      iAssignCartOwnerUseCase,
      iLoginUseCase
    );
  }
}
