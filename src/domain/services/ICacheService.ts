export interface ISetOptions {
    EX?: number;
    PX?: number; 
    NX?: true;
    XX?: true;
    KEEPTTL?: true;
    GET?: true;
  }
  
export interface ICacheService {
    set(key: string, val: string, options?: ISetOptions): Promise<void>;
    get(key: string): Promise<string | undefined>;
    ttl(key: string): Promise<number>;
    flush(): Promise<void>;
}