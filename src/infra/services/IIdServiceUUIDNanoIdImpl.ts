import { IIdService } from '@domain/services/IIdService/IIdService';
import { v4 as uuidv4 } from 'uuid';
import { nanoid } from 'nanoid';

export class IIdServiceUUIDNanoIdImpl implements IIdService {
    uuidv4(): string {
        return uuidv4();
    }

    id6Len(): string {
        return nanoid(6);
    }
}