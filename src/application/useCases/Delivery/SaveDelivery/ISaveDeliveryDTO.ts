import { IDelivery } from '@domain/entities/Delivery';

export interface ISaveDeliveryDTO
  extends Omit<
    IDelivery,
    'id' | 'public_id' | 'created_at' | 'updated_at' | 'status' | 'delivered_at'
  > {}
