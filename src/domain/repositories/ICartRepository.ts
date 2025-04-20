import { Cart } from "@domain/entities/Cart";
import { Product } from "@domain/entities/Product";
import { IAssignCartOwnerDTO } from "@application/useCases/Сart/AssignCartOwner/IAssignCartOwnerDTO";
import { IListCartContentDTO } from "@application/useCases/Сart/ListCartContent/IListCartContentDTO";

export interface ICartRepository {
    assignCart(DTO: IAssignCartOwnerDTO): Promise<Cart>;
    listCartContent(DTO: IListCartContentDTO): Promise<Product[] | null>;
}