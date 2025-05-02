import { IAssignCartOwnerDTO } from '@application/useCases/Сart/AssignCartOwner/IAssignCartOwnerDTO';
import { IAttachProductIntoCartDTO } from '@application/useCases/Сart/AttachProductIntoCart/IAttachProductIntoCartDTO';
import { IDetachProductFromCartDTO } from '@application/useCases/Сart/DetachProductFromCart/IDetachProductFromCartDTO';
import { IGetCartDTO } from '@application/useCases/Сart/GetCart/IGetCartDTO';
import { IListCartContentDTO } from '@application/useCases/Сart/ListCartContent/IListCartContentDTO';
import { Cart } from '@domain/entities/Cart';
import { Product } from '@domain/entities/Product';
import { ICartRepository } from '@domain/repositories/ICartRepository';
import { ICartRepositoryPrismaImpl } from '@infra/repositories/Cart/ICartRepositoryPrismaImpl';

class ICartDecorator implements ICartRepository {
    constructor(
        private readonly decoratee: ICartRepository
    ) {}

    async assignCartOwner({ 
        public_id 
    }: IAssignCartOwnerDTO): Promise<void> {
        await this.decoratee.assignCartOwner({
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

    async detachProductFromCart({
        cart_id, 
        product_id
    }: IDetachProductFromCartDTO): Promise<void> {
        await this.decoratee.detachProductFromCart({
            cart_id,
            product_id
        })
    }

    async getCart({
        owner_id
    }: IGetCartDTO): Promise<Cart | null> {
        return await this.decoratee.getCart({
            owner_id
        });
    }
}

const decoratee = new ICartRepositoryPrismaImpl();
const iCartDecorator = new ICartDecorator(decoratee);

export { iCartDecorator };