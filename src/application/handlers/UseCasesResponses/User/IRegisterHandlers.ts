import { InvalidPasswordIsNotEqualErrorResponse, InvalidUserNotFoundErrorResponse, ILoginResponse } from './ILoginHandlers';
import { InvalidGenerateRefreshTokenErrorResponse } from '../RefreshToken/IGenerateRefreshTokenHandler';
import { IAssignCartOwnerResponse, InvalidOwnerNotFoundErrorResponse } from '../Cart/IAssignCartOwnerHandlers';

export class InvalidUserConflictErrorResponse extends Error {};

export interface IRegisterReponse {
    assign_cart_owner_response: InvalidOwnerNotFoundErrorResponse 
          | IAssignCartOwnerResponse
    login_response: InvalidUserNotFoundErrorResponse
          | InvalidPasswordIsNotEqualErrorResponse
          | InvalidGenerateRefreshTokenErrorResponse
          | ILoginResponse,
}