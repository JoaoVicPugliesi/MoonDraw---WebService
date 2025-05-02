// Request
export interface IResendVerificationTokenDTO {
    verification_token: string
}

// Response

export class SessionIsExpiredErrorResponse extends Error {};
export interface IResendVerificationTokenResponse {

}