import { Cart } from "@domain/entities/Cart";
import { Product } from "@domain/entities/Product";
import { IAssignCartOwnerDTO } from "@application/useCases/Сart/AssignCartOwner/IAssignCartOwnerDTO";
import { IListCartContentDTO } from "@application/useCases/Сart/ListCartContent/IListCartContentDTO";
import { IAttachProductIntoCart } from "@application/useCases/Сart/AttachProductIntoCart/IAttachProductIntoCartDTO";

export interface ICartRepository {
    assignCartOwner(DTO: IAssignCartOwnerDTO): Promise<Cart>;
    listCartContent(DTO: IListCartContentDTO): Promise<Product[] | null>;
    attachProductIntoCart(DTO: IAttachProductIntoCart): Promise<void>;
}