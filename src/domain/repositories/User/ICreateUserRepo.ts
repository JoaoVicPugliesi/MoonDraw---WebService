import { IPasswordService } from './../../services/IPasswordService';
import { ICreateUserDTO } from "../../../application/useCases/User/CreateUser/ICreateUserDTO";
import { User } from "../../entities/User";

export interface ICreateUserRepo {
    findUser<T>(param: T): Promise<boolean>;
    save(DTO: ICreateUserDTO, iPasswordService: IPasswordService): Promise<User>; 
}

