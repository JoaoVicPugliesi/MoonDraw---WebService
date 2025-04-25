import { IPurchaseRepository } from '@domain/repositories/IPurchaseRepository';
import { ICompletePurchaseDTO } from './ICompletePurchaseDTO';
import { IPaymentService } from '@domain/services/IPaymentService';
import { ISaveDeliveryUseCase } from '@application/useCases/Delivery/SaveDelivery/ISaveDeliveryUseCase';
import { Delivery } from '@domain/entities/Delivery';
import { Purchase } from '@domain/entities/Purchase';
import {
  ICompletePurchaseResponse,
  PurchaseHasNoOwnerErrorResponse,
} from '@application/handlers/UseCasesResponses/Purchase/ICompletePurchaseHandlers';
import { IRetrieveResponse } from '@domain/services/helpers/Payment';

export class ICompletePurchaseUseCase {
  constructor(
    private readonly iPurchaseRepository: IPurchaseRepository,
    private readonly iPaymentService: IPaymentService,
    private readonly iSaveDeliveryUseCase: ISaveDeliveryUseCase
  ) {}

  async execute({
    purchase_id,
    session_id,
  }: ICompletePurchaseDTO): Promise<
    PurchaseHasNoOwnerErrorResponse | ICompletePurchaseResponse
  > {
    const owner: Pick<Purchase, 'user_id'> | null =
      await this.iPurchaseRepository.findPurchaseOwner({
        purchase_id,
      });

    if (!owner) return new PurchaseHasNoOwnerErrorResponse();

    const { user_id } = owner;
    const session: IRetrieveResponse = await this.iPaymentService.retrieve(
      session_id,
      {
        expand: ['payment_intent.payment_method'],
      }
    );

    const { customer_details } = session;
    const { payment_intent } = session;
    let paymentMethodType: string = '';
    if (
      typeof payment_intent === 'object' &&
      payment_intent &&
      'payment_method' in payment_intent &&
      typeof payment_intent.payment_method === 'object' &&
      payment_intent.payment_method &&
      'type' in payment_intent.payment_method &&
      typeof payment_intent.payment_method.type === 'string'
    ) {
      paymentMethodType = payment_intent.payment_method.type;
    }

    const delivery: Delivery = await this.iSaveDeliveryUseCase.execute({
      purchase_id,
      user_id,
      country: customer_details?.address?.country ?? '',
      city: customer_details?.address?.city ?? '',
      recipient_email: customer_details?.email ?? '',
      recipient_name: customer_details?.name ?? '',
      recipient_phone: customer_details?.phone,
      state: customer_details?.address?.state ?? '',
      address_line1: customer_details?.address?.line1 ?? '',
      address_line2: customer_details?.address?.line2,
      postal_code: customer_details?.address?.postal_code ?? '',
    });

    await this.iPurchaseRepository.completePurchase({
      purchase_id,
      payment_method: paymentMethodType,
    });

    return {
      delivery: delivery,
    };
  }
}
