export interface IProductResponseValidator {
    validateFetchProducts(): Record<number, any>;
    validateSelectProduct(): Record<number, any>;
    validateSearchProducts(): Record<number, any>;
    validateSaveProduct(): Record<number, any>;
}