import { Payment } from './helpers/Payment';

export interface IRetrieveParams {
  expand: Array<string>
}

export interface IPaymentService {
  create(params: Payment, options?: object): Promise<any>;
  retrieve(session_id: string, params?: IRetrieveParams): Promise<any>;
  listLineItems(session_id: string): Promise<any>;
}
