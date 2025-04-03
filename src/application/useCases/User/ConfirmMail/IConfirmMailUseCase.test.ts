import { IConfirmMailFactoryInMemory } from "@application/factories/User/ConfirmMail/IConfirmMailFactoryInMemory";
import { User } from "@domain/entities/User";
import { IConfirmMailDTO } from "./IConfirmMailDTO";
import { InvalidUserNotFoundError } from "@application/handlers/UseCasesResponses/User/IConfirmMailHandlers";

const users: User[] = [];
const user: User = {
    id: users.length + 1,
    public_id: '56d7ff79-f16d-434b-9183-5b0db27fa4e2',
    name: 'João',
    surname: 'Pugliesi',
    email: 'mrlanguages62@gmail.com',
    password: '$2b$10$GX73JFHmigssj00i5mES9uak392P5wSrS6caNFaQ0ybZkm2TBuBkK',
    role: 'client',
    is_active: false,
    created_at: new Date(),
    email_verified_at: null,
}
users.push(user);

describe('I confirm mail use case', () => {
    it('should fail because user does not exist', async () => {
        // Arrange
        const usersSpliced = users.toSpliced(0);
        const iConfirmMailFactoryInMemory = new IConfirmMailFactoryInMemory(usersSpliced);
        const iConfirmMailUseCase = iConfirmMailFactoryInMemory.compose();
        const DTO: IConfirmMailDTO = {
            email: 'mrlanguages62@gmail.com',
            token: '55ac44de182e35de21c2894577841afe2c9a2372f50823dccda17553de526781a5b77e851932363d67a3ce5908fdcea3024b5b1b6fe3f3fcc410fd2415f49a57'
        }
        // Act
        const confirmed:  InvalidUserNotFoundError | void = await iConfirmMailUseCase.execute(DTO);
        // Assert
        expect(confirmed).toBeInstanceOf(InvalidUserNotFoundError);
    });
    it('should activate user successfully', async () => {
        // Arrange
        const iConfirmMailFactoryInMemory = new IConfirmMailFactoryInMemory(users);
        const iConfirmMailUseCase = iConfirmMailFactoryInMemory.compose();
        const DTO: IConfirmMailDTO = {
            email: 'mrlanguages62@gmail.com',
            token: '55ac44de182e35de21c2894577841afe2c9a2372f50823dccda17553de526781a5b77e851932363d67a3ce5908fdcea3024b5b1b6fe3f3fcc410fd2415f49a57'
        }
        // Act
        const confirmed: InvalidUserNotFoundError | void = await iConfirmMailUseCase.execute(DTO);
        // Assert
        expect(confirmed).not.toBeInstanceOf(InvalidUserNotFoundError);
        console.log(user);
    });
});