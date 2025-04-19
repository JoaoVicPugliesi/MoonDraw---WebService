import { IAssignCartOwnerDTO } from "@application/useCases/Сart/AssignCartOwner/IAssignCartOwnerDTO";
import { Cart } from "@domain/entities/Cart";

export interface ICartRepository {
    assignCart(DTO: IAssignCartOwnerDTO): Promise<Cart>;
}