import { ITokenService } from '@domain/services/ITokenService';
import { RequestResponseAdapter } from '@adapters/ServerAdapter';

export class IEnsureUserIsAdminMiddleware {
  private readonly secret_key: string;

  constructor(
    private readonly adapter: RequestResponseAdapter,
    private readonly iTokenService: ITokenService
  ) {
    this.secret_key = process.env.SECRET_KEY as string;
  }

  ensure() {
    const accessToken = this.adapter.req.headers?.authorization;

    if (!accessToken) {
      return this.adapter.res.status(401).send({ message: 'Token is missing' });
    }

    const [, token] = accessToken.split(' ');
    const tokenDecoded = this.iTokenService.decode(token, {
        json: true,
        complete: true
    });

    const { role } = tokenDecoded.payload.content;

    if(role === 'client') {
        return new Error();
    }
    try {
      this.iTokenService.verify({
        token: token,
        secret_key: this.secret_key,
      });
    } catch (error) {
      return this.adapter.res.status(401).send({ 
        message: 'Token invalid',
        error: error
      });
    }
  }
}
