import { IDeliveryRepository } from '@domain/repositories/IDeliveryRepository';
import { ISaveDeliveryDTO } from './ISaveDeliveryDTO';
import { Delivery } from '@domain/entities/Delivery';

export class ISaveDeliveryUseCase {
  constructor(
    private readonly iDeliveryRepository: IDeliveryRepository
  ) {}

  async execute({
    user_id,
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
  }: ISaveDeliveryDTO): Promise<void> {
    await this.iDeliveryRepository.saveDelivery({
      user_id,
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
  }
}
