import { DocSchema } from "@adapters/ServerAdapter";

export interface IUserDocs {
    registerDocs(): DocSchema;
    loginDocs(): DocSchema;
    logoutDocs(): DocSchema;
    confirMailDocs(): DocSchema;
}