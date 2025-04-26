import { DocSchema } from "@adapters/ServerAdapter";

export interface IPurchaseDocs {
    initiatePurchaseDocs(): DocSchema;
    listPurchasesDocs(): DocSchema;
    checkoutPurchaseDocs(): DocSchema;
    removePurchaseDocs(): DocSchema;
    completePurchaseDocs(): DocSchema
}