import { JwtPayload } from 'jsonwebtoken';
import { Token } from './helpers/Token';

export interface ITokenService {
  sign(params: Token): string;
  verify(params: Token): string | JwtPayload;
}
