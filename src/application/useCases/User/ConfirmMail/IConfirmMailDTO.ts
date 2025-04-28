// Request
export interface IConfirmMailDTO  {
  token: string;
}

// Response
export class TokenExpiredErrorResponse extends Error {};

export interface IConfirmMailResponse {
    
}