import { IRetrieveParams, IRetrieveResponse, Payment } from "./Payment";

export interface IPaymentProvider {
  create(params: Payment, options?: object): Promise<any>;
  retrieve(
    session_id: string,
    params?: IRetrieveParams
  ): Promise<IRetrieveResponse>;
  listLineItems(session_id: string): Promise<any>;
}
