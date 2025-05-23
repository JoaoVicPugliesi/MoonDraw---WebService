import { IRetrieveParams, IRetrieveResponse, Payment } from '@domain/providers/Payment/Payment';
import { IPaymentProvider } from '@domain/providers/Payment/IPaymentProvider';
import { stripe } from '@api/stripe/stripe';

export class IPaymentProviderStripeImpl implements IPaymentProvider {
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
