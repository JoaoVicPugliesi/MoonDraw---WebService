import { INodemailerMailProviderImpl } from '@infra/providers_implementation/Mail/INodeMailerMailProviderImplementation';
import { IBcryptHashServiceImpl } from '@infra/services_implementation/IBcryptHashServiceImpl';
import { IJWTTokenServiceImpl } from '@infra/services_implementation/IJWTTokenServiceImpl';
import { IRegisterRepoImpl } from '@infra/repositories_implementation/User/Register/IRegisterRepoImpl';
import { IGenerateRefreshTokenRepoImpl } from '@infra/repositories_implementation/RefreshToken/GenerateRefreshToken/IGenerateRefreshTokenRepoImpl';
import { IGenerateRefreshTokenUseCase } from '@application/useCases/RefreshToken/GenerateRefreshToken/IGenerateRefreshTokenUseCase';
import { ILoginRepoImpl } from '@infra/repositories_implementation/User/Login/ILoginRepoImpl';
import { ILoginUseCase } from '../Login/ILoginUseCase';
import { IRegisterUseCase } from './IRegisterUseCase';
import { IRegisterController } from './IRegisterController';

const iMailProvider = new INodemailerMailProviderImpl();
const iHashService = new IBcryptHashServiceImpl();
const iTokenService = new IJWTTokenServiceImpl();
const iRegisterRepo = new IRegisterRepoImpl(iHashService);
const iGenerateRefreshTokenRepo = new IGenerateRefreshTokenRepoImpl();
const iGenerateRefreshTokenUseCase = new IGenerateRefreshTokenUseCase(iGenerateRefreshTokenRepo);
const iLoginRepo = new ILoginRepoImpl();
const iLoginUseCase = new ILoginUseCase(iLoginRepo, iHashService, iTokenService, iGenerateRefreshTokenUseCase);
const iRegisterUseCase = new IRegisterUseCase(
  iRegisterRepo,
  iMailProvider,
  iLoginUseCase
);
const iRegisterController = new IRegisterController(
  iRegisterUseCase
);

export const register: IRegisterController = iRegisterController;
