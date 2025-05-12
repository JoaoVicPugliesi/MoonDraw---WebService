import { ICartRepository } from '@domain/repositories/ICartRepository';
import {
  IAssignCartOwnerDTO,
  IAssignCartOwnerResponse,
  OwnerNotFoundErrorResponse,
} from './IAssignCartOwnerDTO';
import { IUserRepository } from '@domain/repositories/IUserRepository';
import { User } from '@domain/entities/User';

export class IAssignCartOwnerUseCase {
  constructor(
    private readonly iCartRepository: ICartRepository,
    private readonly iUserRepository: IUserRepository
  ) {}

  async execute({
    public_id,
  }: IAssignCartOwnerDTO): Promise<IAssignCartOwnerResponse> {
    const user: User | null = await this.iUserRepository.findUserById({
      public_id,
    });

    if (!user) return new OwnerNotFoundErrorResponse();

    await this.iCartRepository.assignCartOwner({
      public_id,
    });

    return {
      success: true
    };
  }
}
