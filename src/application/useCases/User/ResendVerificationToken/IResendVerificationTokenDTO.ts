// Request
export interface IResendVerificationTokenDTO {
    verification_token: string
}

// Response

export class SessionIsExpiredErrorResponse extends Error {};
export interface Success {
    success: boolean
}

export type IResendVerificationTokenResponse = 
| SessionIsExpiredErrorResponse
| Success