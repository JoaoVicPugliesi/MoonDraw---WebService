import SMTPTransport from "nodemailer/lib/smtp-transport";
import { InvalidPasswordIsNotEqualErrorResponse, InvalidUserNotFoundErrorResponse, LoginResponse } from "./ILoginHandlers";
import { InvalidGenerateRefreshTokenErrorResponse } from "../RefreshToken/IGenerateRefreshTokenHandler";

export class InvalidUserConflictErrorResponse extends Error {};

export interface RegisterReponse {
    mail_response: SMTPTransport.SentMessageInfo,
    login_response: InvalidUserNotFoundErrorResponse
          | InvalidPasswordIsNotEqualErrorResponse
          | InvalidGenerateRefreshTokenErrorResponse
          | LoginResponse,
}