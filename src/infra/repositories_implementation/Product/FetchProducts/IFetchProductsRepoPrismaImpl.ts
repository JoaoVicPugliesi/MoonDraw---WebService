import { IFetchProductsDTO } from "@application/useCases/Product/FetchProducts/IFetchProductsDTO";
import { Product } from "@domain/entities/Product";
import { IFetchProductsRepo } from "@domain/repositories/Product/IFetchProductsRepo";
import { prisma } from "@infra/db/Prisma";

export class IFetchProductsRepoPrismaImpl implements IFetchProductsRepo {
    async fetchProducts({ page }: IFetchProductsDTO): Promise<Product[] | null> {
        const products: Product[] | null = await prisma.product.findMany({
            skip: 10 * (page - 1),
            take: 10,
        });

        return products;
    }
}