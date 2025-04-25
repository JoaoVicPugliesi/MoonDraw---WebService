import { IRetrieveParams, IRetrieveResponse, Payment } from "./helpers/Payment";


export interface IPaymentService {
  create(params: Payment, options?: object): Promise<any>;
  retrieve(
    session_id: string,
    params?: IRetrieveParams
  ): Promise<IRetrieveResponse>;
  listLineItems(session_id: string): Promise<any>;
}
