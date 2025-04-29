import { EndpointConfig } from "@adapters/ServerAdapter";

export interface IUserConfigs {
    registerConfig(): EndpointConfig;
    loginConfig(): EndpointConfig;
}