import { DocSchema } from "@adapters/ServerAdapter";

export interface ICartDocs {
    listCartContentDoc(): DocSchema;
    attachProductIntoCartDoc(): DocSchema;
    detachProductFromCartDoc(): DocSchema;
    getCart(): DocSchema;
}