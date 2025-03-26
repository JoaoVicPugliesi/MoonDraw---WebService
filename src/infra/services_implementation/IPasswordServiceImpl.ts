import bcrypt from 'bcrypt';
import { IPasswordService } from "../../domain/services/IPasswordService";

export class IPasswordServiceImpl implements IPasswordService {

    private readonly salts: number = 10;

    async hash(plainPassword: string): Promise<string> {
        const hash: string = await bcrypt.hash(plainPassword, this.salts);
        return hash;
    }

    async compare(plainPassword: string, hashedPassword: string): Promise<boolean> {
        const isEqual: boolean = await bcrypt.compare(plainPassword, hashedPassword);

        return isEqual;
    }
}