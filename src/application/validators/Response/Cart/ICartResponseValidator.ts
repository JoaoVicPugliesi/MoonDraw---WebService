export interface ICartResponseValidator {
    validateGetCart(): Record<number, any>;
    validateListCartContent(): Record<number, any>;
    validateAttachProductIntoCart(): Record<number, any>;
    validateDetachProductFromCart(): Record<number, any>;
}