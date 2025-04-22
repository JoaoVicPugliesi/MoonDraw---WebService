export class TokenIsMissingErrorResponse extends Error {};
export class TokenInvalidErrorResponse extends Error {
    constructor(private readonly error: any) {
        super()
    }
};
export class TokenInvalidFormatErrorResponse extends Error {
    constructor(private readonly error: any) {
        super()
    }
};
export class RefreshTokenCookieMissingErrorResponse extends Error{};
export class MustBeAnAdmingErrorResponse extends Error{};