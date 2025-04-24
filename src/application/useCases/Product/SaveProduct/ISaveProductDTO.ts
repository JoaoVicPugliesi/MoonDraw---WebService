import { IProduct } from '@domain/entities/Product';

export interface ISaveProductDTO extends Omit<IProduct, 'id' | 'public_id' | 'published_at' | 'updated_at'> {}