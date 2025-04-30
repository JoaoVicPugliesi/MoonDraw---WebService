import { DocSchema } from "@adapters/ServerAdapter";

export interface IPurchaseDocs {
    initiatePurchaseDoc(): DocSchema;
    listPurchasesDoc(): DocSchema;
    checkoutPurchaseDoc(): DocSchema;
    removePurchaseDoc(): DocSchema;
    completePurchaseDoc(): DocSchema
}