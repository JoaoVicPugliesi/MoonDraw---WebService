import { IUser } from "@domain/entities/User";

export interface IAssignCartOwnerDTO extends Pick<IUser, 'public_id'> {}