import { ILoginRepoImpl } from './../../../../infra/repositories_implementation/User/Login/ILoginRepoImpl';
import { IHashServiceImpl } from '@infra/services_implementation/IHashServiceImpl';
import { ITokenServiceImpl } from '@infra/services_implementation/ITokenServiceImpl';
import { IGenerateRefreshTokenRepoImpl } from '@infra/repositories_implementation/RefreshToken/IGenerateRefreshTokenRepoImpl';
import { IGenerateRefreshTokenUseCase } from '@application/useCases/RefreshToken/GenerateRefreshToken/IGenerateRefreshTokenUseCase';
import { ILoginUseCase } from './ILoginUseCase';
import { ILoginController } from './ILoginController';

const iLoginRepo = new ILoginRepoImpl();
const iHashService = new IHashServiceImpl();
const iTokenService = new ITokenServiceImpl();
const iGenerateRefreshTokenRepo = new IGenerateRefreshTokenRepoImpl();
const iGenerateRefreshTokenUseCase = new IGenerateRefreshTokenUseCase(
  iGenerateRefreshTokenRepo
);
const iLoginUseCase = new ILoginUseCase(
  iLoginRepo,
  iHashService,
  iTokenService,
  iGenerateRefreshTokenUseCase
);
const iLoginController = new ILoginController(iLoginUseCase);

export const login: ILoginController = iLoginController;
