import { ISetOptions } from "./Cache";

export interface ICacheProvider {
    set(key: string, val: string, options?: ISetOptions): Promise<void>;
    get(key: string): Promise<string | null>;
    ttl(key: string): Promise<number>;
    flush(): Promise<void>;
}