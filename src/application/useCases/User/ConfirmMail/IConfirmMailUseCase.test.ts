import { User } from '@domain/entities/User';
import { IConfirmMailFactoryInMemory } from '@application/factories/User/ConfirmMail/IConfirmMailFactoryInMemory';
import { IConfirmMailUseCase } from './IConfirmMailUseCase';
import {
  IConfirmMailDTO,
  IConfirmMailResponse,
  TokenDoesNotMatchErrorResponse,
  TokenExpiredErrorResponse,
} from './IConfirmMailDTO';
import { configDotenv } from 'dotenv';
import { Cart } from '@domain/entities/Cart';
configDotenv()

const artistUser: Pick<
  User,
  'icon_id' | 'name' | 'surname' | 'email' | 'description' | 'role'
> = {
  icon_id: 'sjajskasja9uw1921u9w',
  name: 'João',
  surname: 'Pugliesi',
  email: 'mrlanguages62@gmail.com',
  description: '',
  role: 'Artist',
};

const buyerUser: Pick<
  User,
  'icon_id' | 'name' | 'surname' | 'email' | 'description' | 'role'
> = {
  icon_id: 'sjajskasja9uw1921u9w',
  name: 'Julius',
  surname: 'Erving',
  email: 'juliuservingboss@gmail.com',
  description: '',
  role: 'Buyer',
};
const cache: Map<string, string> = new Map<string, string>();
cache.set('user-AD34B2', JSON.stringify(artistUser));
cache.set('user-KH39K2', JSON.stringify(buyerUser));
const users: User[] = [];
const carts: Cart[] = [];

describe('Should analyse every possible end related to confirming mail', () => {
  it('must fail confirm mail because verification_token does not match', async () => {
    // Arrange
    const iFactory = new IConfirmMailFactoryInMemory(users, carts, cache);
    const sut: IConfirmMailUseCase = iFactory.compose();
    const { verification_token, ensure_verification_token }: IConfirmMailDTO = {
      verification_token: 'AD34B2',
      ensure_verification_token: 'ADBL78',
    };
    // Act
    const response: IConfirmMailResponse = await sut.execute({
      verification_token,
      ensure_verification_token,
    });
    // Assert
    expect(response).toBeInstanceOf(TokenDoesNotMatchErrorResponse);
    expect(response).not.toBeInstanceOf(TokenExpiredErrorResponse);
    expect(response).not.toHaveProperty('success');
  });
  it('must not confirm email because verification_token is expired', async () => {
    // Arrange
    cache.delete('user-AD34B2');
    const iFactory = new IConfirmMailFactoryInMemory(users, carts, cache);
    const sut: IConfirmMailUseCase = iFactory.compose();
    const { verification_token, ensure_verification_token }: IConfirmMailDTO = {
      verification_token: 'AD34B2',
      ensure_verification_token: 'AD34B2',
    };
    // Act
    const response: IConfirmMailResponse = await sut.execute({
      verification_token,
      ensure_verification_token,
    });
    // Assert
    expect(response).not.toBeInstanceOf(TokenDoesNotMatchErrorResponse);
    expect(response).toBeInstanceOf(TokenExpiredErrorResponse);
    expect(response).not.toHaveProperty('success');
  });
  it('must confirm email successfully and persist the artist user', async () => {
    // Arrange
    cache.set('user-AD34B2', JSON.stringify(artistUser));
    const iConfirmMailFactory = new IConfirmMailFactoryInMemory(users, carts, cache);
    const sut: IConfirmMailUseCase = iConfirmMailFactory.compose();
    const { verification_token, ensure_verification_token }: IConfirmMailDTO = {
      verification_token: 'AD34B2',
      ensure_verification_token: 'AD34B2',
    };
    // Act
    const confirmMailresponse: IConfirmMailResponse = await sut.execute({
      verification_token,
      ensure_verification_token,
    });
    // Assert
    expect(confirmMailresponse).not.toBeInstanceOf(TokenDoesNotMatchErrorResponse);
    expect(confirmMailresponse).not.toBeInstanceOf(TokenExpiredErrorResponse);
    expect(confirmMailresponse).toHaveProperty('success');
  });
  it('must confirm email successfully, assign cart to user and persist buyer user', async () => {
    const iFactory = new IConfirmMailFactoryInMemory(users, carts, cache);
    const sut: IConfirmMailUseCase = iFactory.compose();
    const { 
      verification_token, 
      ensure_verification_token 
    }: IConfirmMailDTO = {
      verification_token: 'KH39K2',
      ensure_verification_token: 'KH39K2',
    };
    // Act
    const response: IConfirmMailResponse = await sut.execute({
      verification_token,
      ensure_verification_token,
    });
    // Assert
    expect(response).not.toBeInstanceOf(TokenDoesNotMatchErrorResponse);
    expect(response).not.toBeInstanceOf(TokenExpiredErrorResponse);
    expect(response).toHaveProperty('success');
  });
});
