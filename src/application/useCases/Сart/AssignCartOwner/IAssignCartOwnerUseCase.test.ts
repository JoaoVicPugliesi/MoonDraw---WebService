import { Cart } from "@domain/entities/Cart";
import { User } from "@domain/entities/User";
import { IAssignCartOwnerFactoryInMemory } from "@application/factories/Cart/AssignCartOwner/IAssignCartOwnerFactoryInMemory";
import { IAssignCartOwnerUseCase } from "./IAssignCartOwnerUseCase";
import { IAssignCartOwnerDTO, IAssignCartOwnerResponse, OwnerNotFoundErrorResponse } from "./IAssignCartOwnerDTO";

const users: User[] = [];
const user: User = {
  id: users.length + 1,
  public_id: 'a795c246-ca3b-46d0-8f66-b7ffef395b42',
  icon_id: '',
  name: 'João',
  surname: 'Pugliesi',
  email: 'mrlanguages62@gmail.com',
  description: '',
  password: '$2b$10$GX73JFHmigssj00i5mES9uak392P5wSrS6caNFaQ0ybZkm2TBuBkK',
  role: 'Buyer',
  is_email_verified: false,
  created_at: new Date(),
  last_login_at: new Date(),
  email_verified_at: null,
};
const carts: Cart[] = [];
describe('Should analyse every possible end related to assigning cart to user', () => {
  it('must not assign cart to user because user was not found', async () => {
    // Arrange
    const iFactory = new IAssignCartOwnerFactoryInMemory(carts, users);
    const sut: IAssignCartOwnerUseCase = iFactory.compose();
    const {
        public_id
    }: IAssignCartOwnerDTO = {
        public_id: user.public_id
    };
    // Act
    const response: IAssignCartOwnerResponse = await sut.execute({
        public_id
    });
    // Assert
    expect(response).toBeInstanceOf(OwnerNotFoundErrorResponse);
    expect(response).not.toHaveProperty('success');
  });
  it('must assign cart to user successfully', async () => {
    // Arrange
    users.push(user);
    const iFactory = new IAssignCartOwnerFactoryInMemory(carts, users);
    const sut: IAssignCartOwnerUseCase = iFactory.compose();
    const {
        public_id
    }: IAssignCartOwnerDTO = {
        public_id: user.public_id
    };
    // Act
    const response: IAssignCartOwnerResponse = await sut.execute({
        public_id
    });
    // Assert
    expect(response).not.toBeInstanceOf(OwnerNotFoundErrorResponse);
    expect(response).toHaveProperty('success');
  });
});
