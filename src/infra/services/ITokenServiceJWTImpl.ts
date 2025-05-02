import { Token } from '@domain/services/Token/Token';
import { ITokenService } from '@domain/services/Token/ITokenService';
import { JwtPayload, sign, verify, decode } from 'jsonwebtoken';

export class ITokenServiceJWTImpl implements ITokenService {
    sign(params: Token): string {
        return sign(params.payload!, params.secret_key!, params.options)
    }

    verify(params: Token): string | JwtPayload {
        return verify(params.token!, params.secret_key!, params.options);
    }

    decode(token: string, options: object) {
        return decode(token, options);
    }
}