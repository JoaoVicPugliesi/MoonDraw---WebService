import { IDelivery } from '@domain/entities/Delivery';

// Request
export interface ISaveDeliveryDTO
  extends Omit<
    IDelivery,
    'id' | 'public_id' | 'created_at' | 'updated_at' | 'status' | 'delivered_at'
  > {}

// Response
export interface Success {
  success: boolean
}
export type ISaveDeliveryResponse =
| Success