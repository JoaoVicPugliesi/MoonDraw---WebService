import { IHashService } from '../../services/IHashService';
import { IRegisterDTO } from '../../../application/useCases/User/Register/IRegisterDTO';
import { User } from '../../entities/User';

export interface IRegisterRepo {
    findUser<T>(param: T): Promise<boolean>;
    save(DTO: IRegisterDTO, iBcryptService: IHashService): Promise<User>; 
}

