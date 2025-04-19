import { iCartDecorator } from '@application/decorators/ICartDecorator';
import { iUserDecorator } from '@application/decorators/IUserDecorator';
import { IAssignCartOwnerUseCase } from '@application/useCases/Сart/AssignCartOwner/IAssignCartOwnerUseCase';

export class IAssignCartOwnerFactory {
  compose(): IAssignCartOwnerUseCase {
    return new IAssignCartOwnerUseCase(iCartDecorator, iUserDecorator);
  }
}
