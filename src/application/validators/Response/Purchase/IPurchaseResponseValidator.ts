export interface IPurchaseResponseValidator {
    validateInitiatePurchase(): Record<number, any>;
    validateListPurchases(): Record<number, any>;
    validateCheckoutPurchase(): Record<number, any>;
    validateRemovePurchase(): Record<number, any>;
    validateCompletePurchase(): Record<number, any>;
}