import { ISelectProductDTO } from '@application/useCases/Product/SelectProduct/ISelectProductDTO';
import { Product } from '@domain/entities/Product';
import { ISelectProductRepo } from '@domain/repositories/Product/ISelectProductRepo';
import { ISelectProductRepoPrismaImpl } from '@infra/repositories_implementation/Product/SelectProduct/ISelectProductRepoPrismaImpl';

class ISelectProductDecorator implements ISelectProductRepo {
  constructor(private readonly decoratee: ISelectProductRepo) {}

  async selectProduct({
    public_id,
  }: ISelectProductDTO): Promise<Product | undefined> {
    return await this.decoratee.selectProduct({
      public_id,
    });
  }
}

const decoratee: ISelectProductRepo = new ISelectProductRepoPrismaImpl();
const iSelectProductDecorator: ISelectProductDecorator =
  new ISelectProductDecorator(decoratee);

export { iSelectProductDecorator };
