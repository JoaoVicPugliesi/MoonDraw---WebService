import { User } from "../../../../domain/entities/User";
import { ICreateUserRepoImplInMemory } from "../../../../infra/repositories_implementation/User/ICreateUserRepoImplInMemory";
import { ICreateUserUseCase } from "./ICreateUserUseCase";

// Mocks
const iMailProvider = { sendMail: jest.fn() };
const iBCryptService = {
  hash: jest.fn().mockResolvedValue("hashed_password"),
  compare: jest.fn(),
};

describe("Create User UseCase", () => {
  const users: User[] = [];

  it("Should create a user successfully", async () => {
    // Arrange
    const iCreateUserRepoInMemory = new ICreateUserRepoImplInMemory(users);
    const sut = new ICreateUserUseCase(
      iCreateUserRepoInMemory,
      iMailProvider,
      iBCryptService
    );

    // Act
    const created = await sut.execute({
      name: "João",
      surname: "Pugliesi",
      email: "mrlanguages62@gmail.com",
      password: "Mrlanguages1234##",
    }) as User;

    console.log(created);
    console.log(users);

    // Assert
    expect(created).toHaveProperty("id");
    expect(created).toHaveProperty("public_id");
    expect(created.email).toBe("mrlanguages62@gmail.com");
    expect(created.password).toBe("hashed_password");
    expect(created.is_active).toBe(false);
    expect(created.created_at).not.toBe(null);
    expect(created.email_verified_at).toBe(null);
    expect(iMailProvider.sendMail).toHaveBeenCalledWith({
      to: {
        email: created.email,
      },
      from: {
        email: "ecommerce@gmail.com",
      },
      subject: "Confirm Email",
      text: "blabla",
      body: "<button>Confirm Email</button>",
    });
  });

  it("Should fail for the reason of email must be unique and because of this user already exists", async () => {
    // Arrange
    const iCreateUserRepoInMemory = new ICreateUserRepoImplInMemory(users);
    const sut = new ICreateUserUseCase(
      iCreateUserRepoInMemory,
      iMailProvider,
      iBCryptService
    );

    // Act
    const created = await sut.execute({
      name: "João",
      surname: "Pugliesi",
      email: "mrlanguages62@gmail.com",
      password: "Mrlanguages1234##",
    });

    // Assert
    expect(created).toBeFalsy();
  });
});
