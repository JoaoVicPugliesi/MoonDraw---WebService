// Request
export interface IConfirmMailDTO  {
  verification_token: string;
  ensure_verification_token: string
}

// Response
export class TokenDoesNotMatchErrorResponse extends Error {};
export class TokenExpiredErrorResponse extends Error {};
export interface Success {
  success: boolean
}
export type IConfirmMailResponse = 
| TokenDoesNotMatchErrorResponse
| TokenExpiredErrorResponse
| Success