import { IAssignCartOwnerDTO } from "@application/useCases/Сart/AssignCartOwner/IAssignCartOwnerDTO";
import { IListCartContentDTO } from "@application/useCases/Сart/ListCartContent/IListCartContentDTO";
import { Cart } from "@domain/entities/Cart";

export interface ICartRepository {
    assignCart(DTO: IAssignCartOwnerDTO): Promise<Cart>;
    listCartContent(DTO: IListCartContentDTO): Promise<Cart[] | null>;
}