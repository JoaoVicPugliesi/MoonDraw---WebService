import { DocSchema } from "@adapters/ServerAdapter";

export interface IRefreshTokenDocs {
    refreshTokenDoc(): DocSchema;
}