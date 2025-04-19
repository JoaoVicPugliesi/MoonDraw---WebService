import { Cart } from '@domain/entities/Cart';
import { ICartRepository } from '@domain/repositories/ICartRepository';
import { IAssignCartOwnerDTO } from './IAssignCartOwnerDTO';
import { IAssignCartOwnerResponse} from '@application/handlers/UseCasesResponses/Cart/IAssignCartOwnerHandlers';

export class IAssignCartOwnerUseCase {
  constructor(
    private readonly iCartRepository: ICartRepository,
  ) {}

  async execute({ public_id }: IAssignCartOwnerDTO): Promise<IAssignCartOwnerResponse> {

    const cart: Cart = await this.iCartRepository.assignCart({
       public_id
    });

    return {
        cart: cart
    };

  }
}
