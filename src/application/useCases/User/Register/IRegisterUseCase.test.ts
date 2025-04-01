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

// describe('I register', () => {
//   const users: User[] = [];

//   test('must register a user successfully', async () => {
//     // Arrange
//     const iRegisterUserRepoInMemory = new IRegisterRepoImplInMemory(users);
//     const sut = new IRegisterUseCase(
//       iRegisterUserRepoInMemory,
//       iMailProvider,
//       iHashService
//     );

//     // Act
//     const registered = await sut.execute({
//       name: 'João',
//       surname: 'Pugliesi',
//       email: 'mrlanguages62@gmail.com',
//       password: 'Mrlanguages1234##',
//     }) as User;

//     console.log(registered);
//     console.log(users);

//     // Assert
//     expect(registered).toHaveProperty('id');
//     expect(registered).toHaveProperty('public_id');
//     expect(registered.email).toBe('mrlanguages62@gmail.com');
//     expect(registered.password).toBe('hashed_password');
//     expect(registered.is_active).toBe(false);
//     expect(registered.registerd_at).toBeInstanceOf(Date);
//     expect(registered.email_verified_at).toBe(null);
//     expect(iMailProvider.sendMail).toHaveBeenCalledWith({
//       to: {
//         email: registerd.email,
//       },
//       from: {
//         email: 'ecommerce@gmail.com',
//       },
//       subject: 'Confirm Email',
//       text: 'blabla',
//       body: '<p>2hd8k3</p>',
//     });
//   });

//   test('must fail for the reason email should be unique and because of this user already exists', async () => {
//     // Arrange
//     const iregisterUserRepoInMemory = new IRegisterRepoImplInMemory(users);
//     const sut = new IRegisterUseCase(
//       iregisterUserRepoInMemory,
//       iMailProvider,
//       iHashService
//     );

//     // Act
//     const registered = await sut.execute({
//       name: 'João',
//       surname: 'Pugliesi',
//       email: 'mrlanguages62@gmail.com',
//       password: 'Mrlanguages1234##',
//     });

//     // Assert
//     expect(registered).toBeInstanceOf(InvalidUserConflictError);
//   });
// });
