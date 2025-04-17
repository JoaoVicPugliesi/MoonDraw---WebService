import { IRefreshAccessTokenFactory } from '@application/factories/RefreshToken/RefreshAccessToken/IRefreshAccessTokenFactory';
import { IRefreshAccessTokenController } from './IRefreshAccessTokenController';

const iFactory = new IRefreshAccessTokenFactory();
const iUseCase = iFactory.compose();
const iController = new IRefreshAccessTokenController(iUseCase);
const iRefreshToken: IRefreshAccessTokenController = iController;

export { iRefreshToken };
