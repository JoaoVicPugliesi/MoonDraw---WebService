import { DocSchema } from "@adapters/ServerAdapter";

export interface ICartDocs {
    listCartContentDocs(): DocSchema;
    attachProductIntoCartDocs(): DocSchema;
    detachProductFromCartDocs(): DocSchema;
}