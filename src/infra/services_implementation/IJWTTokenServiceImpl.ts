import { Token } from '@domain/services/helpers/Token';
import { ITokenService } from '@domain/services/ITokenService';
import { JwtPayload, sign, verify } from 'jsonwebtoken';

export class IJWTTokenServiceImpl implements ITokenService {
    sign(params: Token): string {
        return sign(params.payload as object, params.secret_key as string, params.options)
    }

    verify(params: Token): string | JwtPayload {
        return verify(params.token as string, params.secret_key as string, params.options);
    }
}