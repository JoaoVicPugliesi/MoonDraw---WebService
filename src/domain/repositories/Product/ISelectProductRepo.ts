import { ISelectProductDTO } from "@application/useCases/Product/SelectProduct/ISelectProductDTO";
import { Product } from "@domain/entities/Product";

export interface ISelectProductRepo {
    selectOne(DTO: ISelectProductDTO): Promise<Product | undefined>;
}