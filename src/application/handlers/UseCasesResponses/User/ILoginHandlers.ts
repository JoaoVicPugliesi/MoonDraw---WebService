import { User } from '@domain/entities/User'

export class UserNotFoundErrorResponse extends Error {}
export class PasswordIsNotEqualErrorResponse extends Error {}

export interface ILoginResponse {
    access_token: string,
    refresh_token: {
        id: number,
        public_id: string,
        expires_in: number,
        user_id: string
    },
    user: Omit<User, 'id' | 'public_id' | 'password' | 'created_at' | 'email_verified_at' | 'last_login_at'>
}