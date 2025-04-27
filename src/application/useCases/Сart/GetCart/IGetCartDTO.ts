import { ICart } from '@domain/entities/Cart';

export interface IGetCartDTO extends Pick<ICart, 'user_id'> {}