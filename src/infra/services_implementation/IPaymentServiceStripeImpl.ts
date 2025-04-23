import { Payment } from '@domain/services/helpers/Payment';
import { IPaymentService } from '@domain/services/IPaymentService';
import { stripe } from '../../../apis/stripe/stripe';

export class IPaymentServiceStripeImpl implements IPaymentService {
    async create(params: Payment): Promise<any> {
        const response = await stripe.checkout.sessions.create(params);
        return response;
    }
}