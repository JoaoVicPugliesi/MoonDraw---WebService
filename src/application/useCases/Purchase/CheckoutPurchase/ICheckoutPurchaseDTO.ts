import { IPurchase } from '@domain/entities/Purchase';

export interface ICheckoutPurchaseDTO extends Pick<IPurchase, 'public_id'> {}