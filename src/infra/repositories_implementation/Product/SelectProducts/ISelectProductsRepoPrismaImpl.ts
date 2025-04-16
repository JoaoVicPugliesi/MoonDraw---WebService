import { ISelectProductsDTO } from "@application/useCases/Product/SelectProducts/ISelectProductsDTO";
import { Product } from "@domain/entities/Product";
import { ISelectProductsRepo } from "@domain/repositories/Product/ISelectProductsRepo";
import { prisma } from "@infra/db/Prisma";

export class ISelectProductsRepoPrismaImpl implements ISelectProductsRepo {
    async selectProducts({ page }: ISelectProductsDTO): Promise<Product[] | null> {
        const products: Product[] | null = await prisma.product.findMany({
            skip: 10 * (page - 1),
            take: 10,
        });

        return products;
    }
}