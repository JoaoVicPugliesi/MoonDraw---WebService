import { ICacheProvider } from '@domain/providers/Cache/ICacheProvider';
import { IPurchaseRepository } from '@domain/repositories/IPurchaseRepository';
import { IListPurchaseResponse, IListPurchasesDTO, PurchasesNotFoundErrorResponse } from './IListPurchasesDTO';
import { Purchase } from '@domain/entities/Purchase';

export class IListPurchasesUseCase {
  constructor(
    private readonly iPurchaseRepository: IPurchaseRepository,
    private readonly iCacheProvider: ICacheProvider
  ) {}

  async execute({ 
    user_id, 
    status 
  }: IListPurchasesDTO): Promise<IListPurchaseResponse | PurchasesNotFoundErrorResponse> {
    const cachedPurchases: string | null = await this.iCacheProvider.get(
        `purchases-${status}-${user_id}`
    );

    if(cachedPurchases) {
        const cachedPurchasesParsed: Purchase[] = JSON.parse(cachedPurchases);
        return {
            purchases: cachedPurchasesParsed
        }
    }

    const purchases: Purchase[] | null = await this.iPurchaseRepository.listPurchases({
        user_id,
        status
    });

    if(!purchases) return new PurchasesNotFoundErrorResponse();

    const expiresIn: number = status === 'pending' ? 600 : 1800;
    await this.iCacheProvider.set(
        `purchases-${status}-${user_id}`,
        JSON.stringify(purchases),
        {
            EX: expiresIn
        }
    )
    return {
        purchases: purchases
    }
  }
}
