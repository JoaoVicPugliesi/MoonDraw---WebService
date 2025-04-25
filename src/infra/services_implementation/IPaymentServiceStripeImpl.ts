import { IRetrieveParams, IRetrieveResponse, Payment } from '@domain/services/helpers/Payment';
import { IPaymentService } from '@domain/services/IPaymentService';
import { stripe } from '../../../apis/stripe/stripe';

export class IPaymentServiceStripeImpl implements IPaymentService {
  async create(params: Payment): Promise<any> {
    const response = await stripe.checkout.sessions.create(params);
    return response;
  }

  async retrieve(session_id: string, params?: IRetrieveParams): Promise<IRetrieveResponse> {
    return await stripe.checkout.sessions.retrieve(session_id, params);
  }

  async listLineItems(session_id: string): Promise<any> {
      return await stripe.checkout.sessions.listLineItems(session_id);
  }
}
