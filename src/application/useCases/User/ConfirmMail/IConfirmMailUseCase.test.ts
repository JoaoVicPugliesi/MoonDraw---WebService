import { IUser, User } from "@domain/entities/User";
import { IConfirmMailFactoryInMemory } from "@application/factories/User/ConfirmMail/IConfirmMailFactoryInMemory";
import { IConfirmMailUseCase } from "./IConfirmMailUseCase";
import {
  IConfirmMailDTO,
  IConfirmMailResponse,
  TokenDoesNotMatchErrorResponse,
  TokenExpiredErrorResponse,
} from "./IConfirmMailDTO";

const user: Pick<
  IUser,
  "icon_id" | "name" | "surname" | "email" | "description" | "role"
> = {
  icon_id: "sjajskasja9uw1921u9w",
  name: "João",
  surname: "Pugliesi",
  email: "mrlanguages62@gmail.com",
  description: "",
  role: "Buyer",
};
const cache: Map<string, string> = new Map<string, string>();
cache.set("user-AD34B1", JSON.stringify(user));
const users: User[] = [];

describe("Should analyse every possible end related to confirming mail", () => {
  it("must fail confirm mail because verification_token does not match", async () => {
    // Arrange
    const iFactory = new IConfirmMailFactoryInMemory(users, cache);
    const sut: IConfirmMailUseCase = iFactory.compose();
    const { verification_token, ensure_verification_token }: IConfirmMailDTO = {
      verification_token: "AD34B2",
      ensure_verification_token: "ADBL78",
    };
    // Act
    const response:
      | IConfirmMailResponse
      | TokenDoesNotMatchErrorResponse
      | TokenExpiredErrorResponse = await sut.execute({
      verification_token,
      ensure_verification_token,
    });
    // Assert
    expect(response).toBeInstanceOf(TokenDoesNotMatchErrorResponse);
    expect(response).not.toBeInstanceOf(TokenExpiredErrorResponse);
    expect(response).not.toHaveProperty('success');
  });
  it("must not confirm email because verification_token does not match the expected one", async () => {
    // Arrange
    const iFactory = new IConfirmMailFactoryInMemory(users, cache);
    const sut: IConfirmMailUseCase = iFactory.compose();
    const { verification_token, ensure_verification_token }: IConfirmMailDTO = {
      verification_token: "AD34B2",
      ensure_verification_token: "AD34B2",
    };
    // Act
    const response:
      | IConfirmMailResponse
      | TokenDoesNotMatchErrorResponse
      | TokenExpiredErrorResponse = await sut.execute({
      verification_token,
      ensure_verification_token,
    });
    // Assert
    expect(response).not.toBeInstanceOf(TokenDoesNotMatchErrorResponse);
    expect(response).toBeInstanceOf(TokenExpiredErrorResponse);
    expect(response).not.toHaveProperty('success');
  });
  it("must send email and ", async () => {
    // Arrange
    const iFactory = new IConfirmMailFactoryInMemory(users, cache);
    const sut: IConfirmMailUseCase = iFactory.compose();
    const { verification_token, ensure_verification_token }: IConfirmMailDTO = {
      verification_token: "AD34B2",
      ensure_verification_token: "AD34B2",
    };
    // Act
    const response:
      | IConfirmMailResponse
      | TokenDoesNotMatchErrorResponse
      | TokenExpiredErrorResponse = await sut.execute({
      verification_token,
      ensure_verification_token,
    });
    // Assert
    expect(response).not.toBeInstanceOf(TokenDoesNotMatchErrorResponse);
    expect(response).not.toBeInstanceOf(TokenExpiredErrorResponse);
    expect(response).toHaveProperty('success');
  });
});
