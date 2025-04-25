import { ISaveDeliveryDTO } from '@application/useCases/Delivery/SaveDelivery/ISaveDeliveryDTO';
import { Delivery } from '@domain/entities/Delivery';
import { IDeliveryRepository } from '@domain/repositories/IDeliveryRepository';
import { IDeliveryRepositoryPrismaImpl } from '@infra/repositories_implementation/Delivery/IDeliveryRepositoryPrismaImpl';

export class IDeliveryDecorator implements IDeliveryRepository {
  constructor(
    private readonly decoratee: IDeliveryRepository
  ) {}

  async saveDelivery({
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
  }: ISaveDeliveryDTO): Promise<Delivery> {
    return await this.decoratee.saveDelivery({
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

const decoratee = new IDeliveryRepositoryPrismaImpl();
const iDeliveryDecorator = new IDeliveryDecorator(decoratee);

export { iDeliveryDecorator };