import { Purchase } from "@domain/entities/Purchase";

export interface IListPurchasesDTO extends Pick<Purchase, 'user_id' | 'status'> {}