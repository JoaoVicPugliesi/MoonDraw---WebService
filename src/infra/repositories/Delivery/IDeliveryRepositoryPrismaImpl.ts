import { ISaveDeliveryDTO } from '@application/useCases/Delivery/SaveDelivery/ISaveDeliveryDTO';
import { Delivery } from '@domain/entities/Delivery';
import { IDeliveryRepository } from '@domain/repositories/IDeliveryRepository';
import { prisma } from '@infra/db/Prisma';
import { v4 as uuidv4 } from 'uuid';

export class IDeliveryRepositoryPrismaImpl implements IDeliveryRepository {
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
    return await prisma.delivery.create({
      data: {
        public_id: uuidv4(),
        user_id: user_id,
        purchase_id: purchase_id,
        recipient_email: recipient_email,
        recipient_name: recipient_name,
        country: country,
        state: state,
        city: city,
        address_line1: address_line1,
        postal_code: postal_code,
        address_line2: address_line2,
        tracking_number: tracking_number,
        carrier: carrier,
        tracking_url: tracking_url,
        recipient_phone: recipient_phone,
        delivery_instructions: JSON.stringify(delivery_instructions),
      },
    });
  }
}
