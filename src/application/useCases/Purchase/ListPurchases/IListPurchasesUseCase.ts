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
    buyer_id, 
    status 
  }: IListPurchasesDTO): Promise<IListPurchaseResponse> {
    const cachedPurchases: string | null = await this.iCacheProvider.get(
        `purchases-${status}-${buyer_id}`
    );

    if(cachedPurchases) {
        const cachedPurchasesParsed: Purchase[] = JSON.parse(cachedPurchases);
        return {
            purchases: cachedPurchasesParsed
        }
    }

    const purchases: Purchase[] | null = await this.iPurchaseRepository.listPurchases({
        buyer_id,
        status
    });

    if(!purchases) return new PurchasesNotFoundErrorResponse();

    const expiresIn: number = status === 'Pending' ? 600 : 1800;
    await this.iCacheProvider.set(
        `purchases-${status}-${buyer_id}`,
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
