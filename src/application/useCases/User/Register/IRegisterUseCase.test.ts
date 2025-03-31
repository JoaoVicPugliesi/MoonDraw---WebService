// import { InvalidUserConflictError } from './../../../handlers/User/IRegisterHandlers';
// import { User } from '../../../../domain/entities/User';
// import { IRegisterRepoImplInMemory } from '../../../../infra/repositories_implementation/User/Register/IRegisterRepoImplInMemory';
// import { IRegisterUseCase } from './IRegisterUseCase';

// // Mocks
// const iMailProvider = { sendMail: jest.fn() };
// const iHashService = {
//   hash: jest.fn().mockResolvedValue('hashed_password'),
//   compare: jest.fn(),
// };

// describe('I Register UseCase', () => {
//   const users: User[] = [];

//   it('must create a user successfully', async () => {
//     // Arrange
//     const iCreateUserRepoInMemory = new IRegisterRepoImplInMemory(users);
//     const sut = new IRegisterUseCase(
//       iCreateUserRepoInMemory,
//       iMailProvider,
//       iHashService
//     );

//     // Act
//     const created = await sut.execute({
//       name: 'João',
//       surname: 'Pugliesi',
//       email: 'mrlanguages62@gmail.com',
//       password: 'Mrlanguages1234##',
//     }) as User;

//     console.log(created);
//     console.log(users);

//     // Assert
//     expect(created).toHaveProperty('id');
//     expect(created).toHaveProperty('public_id');
//     expect(created.email).toBe('mrlanguages62@gmail.com');
//     expect(created.password).toBe('hashed_password');
//     expect(created.is_active).toBe(false);
//     expect(created.created_at).toBeInstanceOf(Date);
//     expect(created.email_verified_at).toBe(null);
//     expect(iMailProvider.sendMail).toHaveBeenCalledWith({
//       to: {
//         email: created.email,
//       },
//       from: {
//         email: 'ecommerce@gmail.com',
//       },
//       subject: 'Confirm Email',
//       text: 'blabla',
//       body: '<p>2hd8k3</p>',
//     });
//   });

//   it('must fail for the reason email should be unique and because of this user already exists', async () => {
//     // Arrange
//     const iCreateUserRepoInMemory = new IRegisterRepoImplInMemory(users);
//     const sut = new IRegisterUseCase(
//       iCreateUserRepoInMemory,
//       iMailProvider,
//       iHashService
//     );

//     // Act
//     const created = await sut.execute({
//       name: 'João',
//       surname: 'Pugliesi',
//       email: 'mrlanguages62@gmail.com',
//       password: 'Mrlanguages1234##',
//     });

//     // Assert
//     expect(created).toBeInstanceOf(InvalidUserConflictError);
//   });
// });
