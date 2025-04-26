import { Product } from '@domain/entities/Product';
import { ICartRepository } from '@domain/repositories/ICartRepository';
import { ICacheProvider } from '@domain/providers/Cache/ICacheProvider';
import { IListCartContentDTO } from './IListCartContentDTO';
import { IListCartContentResponse, CartEmptyErrorResponse } from '@application/handlers/UseCasesResponses/Cart/IListCartContentHandlers';

export class IListCartContentUseCase {
  constructor(
    private readonly iCartRepository: ICartRepository,
    private readonly iCacheProvider: ICacheProvider
  ) {}

  async execute({ 
    public_id 
  }: IListCartContentDTO): Promise<CartEmptyErrorResponse | IListCartContentResponse>  {
    const cachedContent: string | null = await this.iCacheProvider.get(
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

    if(!content) return new CartEmptyErrorResponse();

    await this.iCacheProvider.set(
        `cart-${public_id}`,
        JSON.stringify(content),
        {
            EX: 60
        }
    )

    return {
      content: content,
    };
  }
}
