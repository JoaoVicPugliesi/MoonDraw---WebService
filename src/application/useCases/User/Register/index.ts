import { IRegisterRepoImpl } from '@infra/repositories_implementation/User/Register/IRegisterRepoImpl';
import { IMailProviderImpl } from '@infra/providers_implementation/Mail/IMailProviderImplementation';
import { IHashServiceImpl } from '@infra/services_implementation/IHashServiceImpl';
import { ITokenServiceImpl } from '@infra/services_implementation/ITokenServiceImpl';
import { IGenerateRefreshTokenRepoImpl } from '@infra/repositories_implementation/RefreshToken/GenerateRefreshToken/IGenerateRefreshTokenRepoImpl';
import { IGenerateRefreshTokenUseCase } from '@application/useCases/RefreshToken/GenerateRefreshToken/IGenerateRefreshTokenUseCase';
import { ILoginRepoImpl } from '@infra/repositories_implementation/User/Login/ILoginRepoImpl';
import { ILoginUseCase } from '../Login/ILoginUseCase';
import { IRegisterUseCase } from './IRegisterUseCase';
import { IRegisterController } from './IRegisterController';

const iRegisterRepo = new IRegisterRepoImpl();
const iMailProvider = new IMailProviderImpl();
const iHashService = new IHashServiceImpl();
const iTokenService = new ITokenServiceImpl();
const iGenerateRefreshTokenRepo = new IGenerateRefreshTokenRepoImpl();
const iGenerateRefreshTokenUseCase = new IGenerateRefreshTokenUseCase(iGenerateRefreshTokenRepo);
const iLoginRepo = new ILoginRepoImpl();
const iLoginUseCase = new ILoginUseCase(iLoginRepo, iHashService, iTokenService, iGenerateRefreshTokenUseCase);
const iRegisterUseCase = new IRegisterUseCase(
  iRegisterRepo,
  iMailProvider,
  iHashService,
  iLoginUseCase
);
const iRegisterController = new IRegisterController(
  iRegisterUseCase
);

export const register: IRegisterController = iRegisterController;
