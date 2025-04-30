export interface IUserResponseValidator {
    validateRegisterResponse(): Record<number, any>;
    validateConfirmMailResponse(): Record<number, any>;
    validateLoginResponse(): Record<number, any>;
    validateLogoutResponse(): Record<number, any>;
}