import { PasswordIsNotEqualErrorResponse, UserNotFoundErrorResponse, ILoginResponse } from './ILoginHandlers';
import { GenerateRefreshTokenErrorResponse } from '../RefreshToken/IGenerateRefreshTokenHandler';
import { IAssignCartOwnerResponse, OwnerNotFoundErrorResponse } from '../Cart/IAssignCartOwnerHandlers';

export class UserConflictErrorResponse extends Error {};

export interface IRegisterReponse {
    assign_cart_owner_response: OwnerNotFoundErrorResponse 
          | IAssignCartOwnerResponse
    login_response: UserNotFoundErrorResponse
          | PasswordIsNotEqualErrorResponse
          | GenerateRefreshTokenErrorResponse
          | ILoginResponse,
}