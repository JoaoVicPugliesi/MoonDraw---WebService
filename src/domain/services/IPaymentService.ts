import { Payment } from './helpers/Payment';

export interface IPaymentService {
  create(params: Payment): Promise<any>;
}
