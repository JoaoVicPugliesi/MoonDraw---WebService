import { Cart } from '@domain/entities/Cart';
import { User } from '@domain/entities/User';
import { ICartRepository } from '@domain/repositories/ICartRepository';
import { IUserRepository } from '@domain/repositories/IUserRepository';
import { IAssignCartOwnerDTO } from './IAssignCartOwnerDTO';
import { IAssignCartOwnerResponse, InvalidOwnerNotFoundErrorResponse } from '@application/handlers/UseCasesResponses/Cart/IAssignCartOwnerHandlers';

export class IAssignCartOwnerUseCase {
  constructor(
    private readonly iCartRepository: ICartRepository,
    private readonly iUserRepository: IUserRepository
  ) {}

  async execute({ public_id }: IAssignCartOwnerDTO): Promise<InvalidOwnerNotFoundErrorResponse | IAssignCartOwnerResponse> {
    const user: User | null = await this.iUserRepository.findUser(public_id);

    if(!user) return new InvalidOwnerNotFoundErrorResponse();

    const cart: Cart = await this.iCartRepository.assignCart({
       public_id
    });

    return {
        cart: cart
    };

  }
}
