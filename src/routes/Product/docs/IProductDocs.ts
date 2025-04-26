import { DocSchema } from "@adapters/ServerAdapter";

export interface IProductDocs {
    fetchProductsDocs(): DocSchema;
    selectProductDocs(): DocSchema;
    searchProductDocs(): DocSchema;
    saveProductDocs(): DocSchema;
}