import { IPurchase } from "@domain/entities/Purchase";

export interface IRemovePurchaseDTO extends Pick<IPurchase, 'public_id'> {}