import { User } from '@domain/entities/User';
import { ICartRepository } from '@domain/repositories/ICartRepository';
import { ICacheProvider } from '@domain/providers/Cache/ICacheProvider';
import { IConfirmMailDTO } from './IConfirmMailDTO';
import { IUserRepository } from '@domain/repositories/IUserRepository';
import { TokenExpiredErrorResponse } from '@application/handlers/UseCasesResponses/User/IConfirmMailHandlers';

export class IConfirmMailUseCase {
  constructor(
    private readonly iUserRepository: IUserRepository,
    private readonly iCartRepository: ICartRepository,
    private readonly iCacheProvider: ICacheProvider
  ) {}

  async execute({
    token,
  }: IConfirmMailDTO): Promise<TokenExpiredErrorResponse | void> {
    const cachedUser: string | null = await this.iCacheProvider.get(
      `user-${token}`
    );
    
    console.log(cachedUser);
    
    if (!cachedUser) return new TokenExpiredErrorResponse();

    const { name, surname, email, password }: User = JSON.parse(cachedUser);
    
    const { public_id }: User = await this.iUserRepository.saveUser({
      name,
      surname,
      email,
      password,
    });
    
    await this.iCacheProvider.del(`user-${token}`);
    
    const cachedUserNull: string | null = await this.iCacheProvider.get(
      `user-${token}`
    );
    
    console.log(cachedUserNull);

    await this.iCartRepository.assignCartOwner({
      public_id
    });
  }
}
