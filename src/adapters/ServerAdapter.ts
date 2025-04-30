import { RequestResponseAdapter } from "./RequestResponseAdapter";

export interface DocSchema {
  schema: {
    description?: string,
    tags?: Array<string>,
    body?: object,
    response?: Record<number, any>,
    headers?: object,
    params?: object,
    queryString?: string
  },
}

export interface EndpointConfig {
  rateLimit?: {
    max?: number,
    timeWindow: string
    errorResponseBuilder?(req: any, context: any): any
  },
}

export interface EndpointOptions {
  docs?: DocSchema,
  config?: EndpointConfig,
}

export interface ServerAdapter {
  delete(
    url: string,
    callback: (adapter: RequestResponseAdapter) => Promise<any>,
    options?: EndpointOptions,
  ): void;
  post(
    url: string,
    callback: (adapter: RequestResponseAdapter) => Promise<any>,
    options?: EndpointOptions,
  ): void;
  put(
    url: string,
    callback: (adapter: RequestResponseAdapter) => Promise<any>,
    options?: EndpointOptions,
  ): void;
  get(
    url: string,
    callback: (adapter: RequestResponseAdapter) => Promise<any>,
    options?: EndpointOptions,
  ): void;
  listen(options: { port: number; host: string }): Promise<void>;
  log: { info(msg: string): void; error(msg: Error): void };
  init(): Promise<void>;
  run(): Promise<void>;
}


