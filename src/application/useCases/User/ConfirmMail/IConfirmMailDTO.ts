import { IUser } from "@domain/entities/User";

export interface IConfirmMailDTO extends Pick<IUser, "email"> {
  token: string;
}
