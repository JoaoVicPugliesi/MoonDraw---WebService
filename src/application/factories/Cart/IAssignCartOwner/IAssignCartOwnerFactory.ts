import { iCartDecorator } from '@application/decorators/ICartDecorator';
import { IAssignCartOwnerUseCase } from '@application/useCases/Сart/AssignCartOwner/IAssignCartOwnerUseCase';

export class IAssignCartOwnerFactory {
  compose(): IAssignCartOwnerUseCase {
    return new IAssignCartOwnerUseCase(iCartDecorator);
  }
}
