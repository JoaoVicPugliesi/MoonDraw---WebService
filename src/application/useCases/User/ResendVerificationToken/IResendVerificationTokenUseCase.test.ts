import { IResendVerificationTokenFactoryInMemory } from "@application/factories/User/ResendVerificationToken/IResendVerificationTokenFactoryInMemory";
import { IResendVerificationTokenUseCase } from "./IResendVerificationTokenUseCase";
import { IResendVerificationTokenDTO, IResendVerificationTokenResponse, SessionIsExpiredErrorResponse } from "./IResendVerificationTokenDTO";
import { User } from "@prisma/client";

const map: Map<string, string> = new Map<string, string>();
const key = 'user-2jd345';
const user: Pick<
  User,
  'icon_id' | 'name' | 'surname' | 'email' | 'description' | 'role'
> = {
  icon_id: 'sjajskasja9uw1921u9w',
  name: 'João',
  surname: 'Pugliesi',
  email: 'mrlanguages62@gmail.com',
  description: '',
  role: 'Buyer',
};
map.set(key, JSON.stringify(user));
describe('Should analyse every possible end related to resending the verification token', () => {
  it('Must fail because temporary acess token is expired', async () => {
    // Arrange (Given)
    map.delete(key);
    const iFactory = new IResendVerificationTokenFactoryInMemory(map);
    const sut: IResendVerificationTokenUseCase = iFactory.compose();
    const {
      verification_token
    }: IResendVerificationTokenDTO = {
      verification_token: '2jd345'
    }
    // Act (When)
    const response: IResendVerificationTokenResponse = await sut.execute({
      verification_token
    });
    // Assert (Then)
    expect(response).toBeInstanceOf(SessionIsExpiredErrorResponse);
    expect(response).not.toHaveProperty('success');
  });
  it('Must resend verification token successfully', async () => {
    // Arrange (Given)
    map.set(key, JSON.stringify(user));
    const iFactory = new IResendVerificationTokenFactoryInMemory(map);
    const sut: IResendVerificationTokenUseCase = iFactory.compose();
    const {
      verification_token
    }: IResendVerificationTokenDTO = {
      verification_token: '2jd345'
    }
    // Act (When)
    const response: IResendVerificationTokenResponse = await sut.execute({
      verification_token
    });
    // Assert (Then)
    expect(response).not.toBeInstanceOf(SessionIsExpiredErrorResponse);
    expect(response).toHaveProperty('success');
  });
});
