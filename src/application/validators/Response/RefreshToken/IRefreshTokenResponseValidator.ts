export interface IRefreshTokenResponseValidator {
    validateRefreshAccessTokenResponse(): Record<number, any>;
}