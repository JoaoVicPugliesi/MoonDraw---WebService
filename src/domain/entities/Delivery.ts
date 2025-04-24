import { AllowedCountry } from '@domain/services/helpers/Payment';

type DeliveryStatus = 'processing' | 'delivering' | 'delivered';

export interface IDelivery {
  readonly id: number,
  readonly public_id: string,
  readonly user_id: string,
  readonly purchase_id: string,
  readonly status: DeliveryStatus,
  readonly line1: string,
  readonly line2: string,
  readonly country: AllowedCountry,
  readonly city: string,
  readonly state: string,
  readonly postal_code: number,
  readonly created_at: Date,
  readonly updated_at: Date,
  readonly tracking_number?: string,
  readonly carrier?: string,
  readonly recipient_name?: string,
  readonly recipient_phone?: string,
  readonly delivery_instructions?: string,
  readonly delivered_at?: Date
}

export class Delivery implements IDelivery {
  constructor(
    readonly id: number,
    readonly public_id: string,
    readonly user_id: string,
    readonly purchase_id: string,
    readonly status: DeliveryStatus,
    readonly line1: string,
    readonly line2: string,
    readonly country: AllowedCountry,
    readonly city: string,
    readonly state: string,
    readonly postal_code: number,
    readonly created_at: Date,
    readonly updated_at: Date,
    readonly tracking_number?: string,
    readonly carrier?: string,
    readonly recipient_name?: string,
    readonly recipient_phone?: string,
    readonly delivery_instructions?: string,
    readonly delivered_at?: Date
  ) {}
}
