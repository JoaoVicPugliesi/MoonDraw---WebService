import { DocSchema } from "@adapters/ServerAdapter";

export interface IProductDocs {
    fetchProductsDoc(): DocSchema;
    selectProductDoc(): DocSchema;
    searchProductDoc(): DocSchema;
    saveProductDoc(): DocSchema;
}