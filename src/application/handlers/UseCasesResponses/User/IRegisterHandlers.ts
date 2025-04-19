import SMTPTransport from 'nodemailer/lib/smtp-transport';
import { InvalidPasswordIsNotEqualErrorResponse, InvalidUserNotFoundErrorResponse, LoginResponse } from './ILoginHandlers';
import { InvalidGenerateRefreshTokenErrorResponse } from '../RefreshToken/IGenerateRefreshTokenHandler';
import { IAssignCartOwnerResponse } from '../Cart/IAssignCartOwnerHandlers';

export class InvalidUserConflictErrorResponse extends Error {};

export interface RegisterReponse {
    assign_cart_owner_response: IAssignCartOwnerResponse
    mail_response: SMTPTransport.SentMessageInfo,
    login_response: InvalidUserNotFoundErrorResponse
          | InvalidPasswordIsNotEqualErrorResponse
          | InvalidGenerateRefreshTokenErrorResponse
          | LoginResponse,
}