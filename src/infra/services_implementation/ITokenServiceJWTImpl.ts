import { Token } from '@domain/services/helpers/Token';
import { ITokenService } from '@domain/services/ITokenService';
import { JwtPayload, sign, verify, decode } from 'jsonwebtoken';

export class ITokenServiceJWTImpl implements ITokenService {
    sign(params: Token): string {
        return sign(params.payload as object, params.secret_key as string, params.options)
    }

    verify(params: Token): string | JwtPayload {
        return verify(params.token as string, params.secret_key as string, params.options);
    }

    decode(token: string, options: object) {
        return decode(token, options);
    }
}