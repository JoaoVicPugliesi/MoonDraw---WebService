export class InvalidUserNotFoundErrorResponse extends Error {}
export class InvalidPasswordIsNotEqualErrorResponse extends Error {}

export interface LoginResponse {
    access_token: string,
    refresh_token: {
        id: number,
        public_id: string,
        expires_in: number,
        user_id: string
    },
}