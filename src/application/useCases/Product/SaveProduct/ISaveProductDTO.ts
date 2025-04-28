import { IProduct } from '@domain/entities/Product';

// Request
export interface ISaveProductDTO extends Omit<IProduct, 'id' | 'public_id' | 'published_at' | 'updated_at'> {}

// Response
export class ProductAlreadyExistsErrorResponse extends Error {};