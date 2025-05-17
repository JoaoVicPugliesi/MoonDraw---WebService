import { ISaveDeliveryDTO } from "@application/useCases/Delivery/SaveDelivery/ISaveDeliveryDTO";
import { Delivery } from "@domain/entities/Delivery";
import { IDeliveryRepository } from "@domain/repositories/IDeliveryRepository";
import { randomUUID } from "crypto";

export class IDeliveryRepositoryInMemoryImpl implements IDeliveryRepository {
  constructor(private readonly deliveries: Delivery[]) {}
  async saveDelivery({
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
  }: ISaveDeliveryDTO): Promise<Delivery> {
    const delivery: Delivery = {
      id: this.deliveries.length + 1,
      public_id: randomUUID(),
      buyer_id: buyer_id,
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
      status: 'Processing',
      tracking_url: tracking_url,
      recipient_phone: recipient_phone,
      delivery_instructions: JSON.stringify(delivery_instructions),
      created_at: new Date(),
      updated_at: new Date()
    };
    this.deliveries.push(delivery);
    return delivery;
  }
}
