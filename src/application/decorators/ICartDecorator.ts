import { IAssignCartOwnerDTO } from '@application/useCases/Сart/AssignCartOwner/IAssignCartOwnerDTO';
import { IAttachProductIntoCartDTO } from '@application/useCases/Сart/AttachProductIntoCart/IAttachProductIntoCartDTO';
import { IListCartContentDTO } from '@application/useCases/Сart/ListCartContent/IListCartContentDTO';
import { Cart } from '@domain/entities/Cart';
import { Product } from '@domain/entities/Product';
import { ICartRepository } from '@domain/repositories/ICartRepository';
import { ICartRepositoryPrismaImpl } from '@infra/repositories_implementation/Cart/ICartRepositoryPrismaImpl';

class ICartDecorator implements ICartRepository {
    constructor(
        private readonly decoratee: ICartRepository
    ) {}

    async assignCartOwner({ 
        public_id 
    }: IAssignCartOwnerDTO): Promise<Cart> {
        return await this.decoratee.assignCartOwner({
            public_id
        });
    }

    async listCartContent({ 
        public_id 
    }: IListCartContentDTO): Promise<Product[] | null> {
        return await this.decoratee.listCartContent({
            public_id
        });
    }

    async attachProductIntoCart({
        cart_id,
        product_id
    }: IAttachProductIntoCartDTO): Promise<void> {
        await this.decoratee.attachProductIntoCart({
            cart_id,
            product_id
        });
    }

    async findAttachmentBetweenProductAndCart({
        cart_id,
        product_id
    }: IAttachProductIntoCartDTO): Promise<boolean> {
        return await this.decoratee.findAttachmentBetweenProductAndCart({
            cart_id,
            product_id
        });
    }
}

const decoratee = new ICartRepositoryPrismaImpl();
const iCartDecorator = new ICartDecorator(decoratee);

export { iCartDecorator };