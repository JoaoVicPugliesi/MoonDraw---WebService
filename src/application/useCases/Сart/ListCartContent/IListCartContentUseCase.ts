import { Product } from '@domain/entities/Product';
import { ICartRepository } from '@domain/repositories/ICartRepository';
import { ICacheService } from '@domain/services/ICacheService';
import { IListCartContentDTO } from './IListCartContentDTO';
import { IListCartContentResponse, InvalidCartEmptyErrorResponse } from '@application/handlers/UseCasesResponses/Cart/IListCartContentHandlers';

export class IListCartContentUseCase {
  constructor(
    private readonly iCartRepository: ICartRepository,
    private readonly iCacheService: ICacheService
  ) {}

  async execute({ 
    public_id 
  }: IListCartContentDTO): Promise<InvalidCartEmptyErrorResponse | IListCartContentResponse>  {
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

    if(!content) return new InvalidCartEmptyErrorResponse();

    await this.iCacheService.set(
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
