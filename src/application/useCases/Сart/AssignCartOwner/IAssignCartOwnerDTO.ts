import { IUser } from '@domain/entities/User';

// Request
export interface IAssignCartOwnerDTO extends Pick<IUser, 'public_id'> {};

// Response
export class OwnerNotFoundErrorResponse extends Error {};
export interface Success {
    success: boolean
}
export type IAssignCartOwnerResponse = 
| OwnerNotFoundErrorResponse
| Success