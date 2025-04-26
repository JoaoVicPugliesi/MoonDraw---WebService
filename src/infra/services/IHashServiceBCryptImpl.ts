import bcrypt from 'bcrypt';
import { IHashService } from '@domain/services/Hash/IHashService';

export class IHashServiceBCryptImpl implements IHashService {

    private readonly salt: number = 10;

    async hash(plainPassword: string): Promise<string> {
        const hash: string = await bcrypt.hash(plainPassword, this.salt);
        return hash;
    }

    async compare(plainPassword: string, hashedPassword: string): Promise<boolean> {
        const isEqual: boolean = await bcrypt.compare(plainPassword, hashedPassword);

        return isEqual;
    }
}