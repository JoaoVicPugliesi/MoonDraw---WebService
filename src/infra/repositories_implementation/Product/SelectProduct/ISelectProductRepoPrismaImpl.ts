import { ISelectProductDTO } from "@application/useCases/Product/SelectProduct/ISelectProductDTO";
import { Product } from "@domain/entities/Product";
import { ISelectProductRepo } from "@domain/repositories/Product/ISelectProductRepo";
import { prisma } from "@infra/db/Prisma";

export class ISelectProductRepoPrismaImpl implements ISelectProductRepo {
    async selectProduct({ public_id }: ISelectProductDTO): Promise<Product | undefined> {
        const product: Product | null = await prisma.product.findFirst({
            where: {
                public_id: public_id
            }
        });

        if(!product) return undefined;

        return product;
    }
}