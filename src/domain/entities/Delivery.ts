type DeliveryStatus = 'Processing' | 'Delivering' | 'Delivered';

export interface IDelivery {
  readonly id: number,
  readonly public_id: string,
  readonly buyer_id: string,
  readonly purchase_id: string,
  readonly status: DeliveryStatus,
  readonly recipient_email: string,
  readonly recipient_name: string,
  readonly country: string,
  readonly state: string,
  readonly city: string,
  readonly address_line1: string,
  readonly postal_code: string,
  readonly created_at: Date,
  readonly updated_at: Date,
  readonly address_line2?: string | null,
  readonly tracking_number?: string | null,
  readonly carrier?: string | null,
  readonly tracking_url?: string | null,
  readonly recipient_phone?: string | null,
  readonly delivery_instructions?: any,
  readonly delivered_at?: Date | null
}

export class Delivery implements IDelivery {
  constructor(
    readonly id: number,
    readonly public_id: string,
    readonly buyer_id: string,
    readonly purchase_id: string,
    readonly status: DeliveryStatus,
    readonly recipient_email: string,
    readonly recipient_name: string,
    readonly country: string,
    readonly state: string,
    readonly city: string,
    readonly address_line1: string,
    readonly postal_code: string,
    readonly created_at: Date,
    readonly updated_at: Date,
    readonly address_line2?: string | null,
    readonly tracking_number?: string | null,
    readonly carrier?: string | null,
    readonly tracking_url?: string | null,
    readonly recipient_phone?: string | null,
    readonly delivery_instructions?: any,
    readonly delivered_at?: Date | null
  ) {}
}
