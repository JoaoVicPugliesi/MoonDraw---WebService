import { DocSchema } from "@adapters/ServerAdapter";

export interface IUserDocs {
    registerDoc(): DocSchema;
    loginDoc(): DocSchema;
    logoutDoc(): DocSchema;
    confirmMailDoc(): DocSchema;
}