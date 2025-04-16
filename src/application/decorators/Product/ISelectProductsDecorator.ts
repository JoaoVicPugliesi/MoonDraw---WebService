import { ISelectProductsDTO } from '@application/useCases/Product/SelectProducts/ISelectProductsDTO';
import { Product } from '@domain/entities/Product';
import { ISelectProductsRepo } from "@domain/repositories/Product/ISelectProductsRepo";
import { ISelectProductsRepoPrismaImpl } from '@infra/repositories_implementation/Product/SelectProducts/ISelectProductsRepoPrismaImpl';

export class ISelectProductsDecorator implements ISelectProductsRepo {

    constructor(
        private readonly decoratee: ISelectProductsRepo
    ) {}

    async selectProducts({ page }: ISelectProductsDTO): Promise<Product[] | null> {
        return await this.decoratee.selectProducts({
            page
        });
    }
}

const iSelectProductsRepoPrismaImpl = new ISelectProductsRepoPrismaImpl();
const iSelectProductDecorator = new ISelectProductsDecorator(iSelectProductsRepoPrismaImpl);

export { iSelectProductDecorator }