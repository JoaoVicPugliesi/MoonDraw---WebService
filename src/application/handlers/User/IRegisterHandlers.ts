import SMTPTransport from "nodemailer/lib/smtp-transport";
import { InvalidPasswordIsNotEqualError, InvalidUserNotFoundError, LoginResponse } from "./ILoginHandlers";
import { InvalidGenerateRefreshToken } from "../RefreshToken/IGenerateRefreshTokenHandler";

export class InvalidUserConflictError extends Error {};

export interface RegisterReponse {
    mail_response: SMTPTransport.SentMessageInfo,
    login_response: InvalidUserNotFoundError
          | InvalidPasswordIsNotEqualError
          | InvalidGenerateRefreshToken
          | LoginResponse
}