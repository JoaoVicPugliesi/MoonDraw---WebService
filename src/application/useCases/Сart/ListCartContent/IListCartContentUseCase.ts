import { Product } from '@domain/entities/Product';
import { ICartRepository } from '@domain/repositories/ICartRepository';
import { ICacheService } from '@domain/services/ICacheService';
import { IListCartContentDTO } from './IListCartContentDTO';

export class IListCartContentUseCase {
  constructor(
    private readonly iCartRepository: ICartRepository,
    private readonly iCacheService: ICacheService
  ) {}

  async execute({ public_id }: IListCartContentDTO) {
    const cachedContent: string | null = await this.iCacheService.get(
      `cart-${public_id}`
    );

    if (cachedContent) {
      const cachedContentParsed = JSON.parse(cachedContent);
      return {
        content: cachedContentParsed,
      };
    }
    const content: Product[] | null = await this.iCartRepository.listCartContent({
      public_id,
    });

    await this.iCacheService.set(
        `cart-${public_id}`,
        JSON.stringify(content),
        {
            EX: 300
        }
    )

    return {
      content: content,
    };
  }
}
