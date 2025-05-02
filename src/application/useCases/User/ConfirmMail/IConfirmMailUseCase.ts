import { User } from '@domain/entities/User';
import { ICacheProvider } from '@domain/providers/Cache/ICacheProvider';
import {
  IConfirmMailDTO,
  TokenDoesNotMatchErrorResponse,
  TokenExpiredErrorResponse,
} from './IConfirmMailDTO';
import { IUserRepository } from '@domain/repositories/IUserRepository';
import { IAssignCartOwnerUseCase } from '@application/useCases/Сart/AssignCartOwner/IAssignCartOwnerUseCase';

export class IConfirmMailUseCase {
  constructor(
    private readonly iUserRepository: IUserRepository,
    private readonly iAssignCartOwner: IAssignCartOwnerUseCase,
    private readonly iCacheProvider: ICacheProvider
  ) {}

  async execute({
    verification_token,
    ensure_verification_token,
  }: IConfirmMailDTO): Promise<
    TokenDoesNotMatchErrorResponse | TokenExpiredErrorResponse | void
  > {
    if (verification_token !== ensure_verification_token) return new TokenDoesNotMatchErrorResponse();

    const cachedUser: string | null = await this.iCacheProvider.get(
      `user-${verification_token}`
    );

    if (!cachedUser) return new TokenExpiredErrorResponse();

    const { 
      icon_id,
      name, 
      surname, 
      email, 
      description,
      role,
      password 
    }: User = JSON.parse(cachedUser);

    const { public_id }: User = await this.iUserRepository.saveUser({
      icon_id,
      name,
      surname,
      email,
      description,
      role,
      password,
    });

    await this.iCacheProvider.del(`user-processing-${email}`);
    await this.iCacheProvider.del(`user-${verification_token}`);

    if(role === 'Buyer') {
      await this.iAssignCartOwner.execute({
        public_id,
      });
    }
  }
}
