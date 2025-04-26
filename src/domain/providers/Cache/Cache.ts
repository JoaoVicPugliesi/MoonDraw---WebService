export interface ISetOptions {
    EX?: number;
    PX?: number; 
    NX?: true;
    XX?: true;
    KEEPTTL?: true;
    GET?: true;
}
  