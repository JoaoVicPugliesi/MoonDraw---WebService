import { IProduct } from '@domain/entities/Product';

export interface ISearchProductsDTO extends Pick<IProduct, 'name'> {}