import { Product } from '@domain/entities/Product';

export interface ISelectProductDTO extends Pick<Product, 'public_id'> {}