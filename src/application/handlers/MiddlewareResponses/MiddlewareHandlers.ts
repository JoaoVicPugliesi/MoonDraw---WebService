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
export class MustBeVerifiedErrorResponse extends Error{}
export class RefreshTokenCookieMissingErrorResponse extends Error{};
export class MustBeABuyerErrorResponse extends Error{};
export class MustBeAnArtistErrorResponse extends Error{};
export class MustBeAnAdminErrorResponse extends Error{};