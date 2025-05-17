import { IDeliveryRepository } from '@domain/repositories/IDeliveryRepository';
import { ISaveDeliveryDTO, ISaveDeliveryResponse } from './ISaveDeliveryDTO';

export class ISaveDeliveryUseCase {
  constructor(
    private readonly iDeliveryRepository: IDeliveryRepository
  ) {}

  async execute({
    buyer_id,
    purchase_id,
    recipient_email,
    recipient_name,
    country,
    state,
    city,
    address_line1,
    postal_code,
    address_line2,
    tracking_number,
    carrier,
    tracking_url,
    recipient_phone,
    delivery_instructions,
  }: ISaveDeliveryDTO): Promise<ISaveDeliveryResponse> {
    await this.iDeliveryRepository.saveDelivery({
      buyer_id,
      purchase_id,
      recipient_email,
      recipient_name,
      country,
      state,
      city,
      address_line1,
      postal_code,
      address_line2,
      tracking_number,
      carrier,
      tracking_url,
      recipient_phone,
      delivery_instructions,
    });

    return {
      success: true
    }
  }
}
