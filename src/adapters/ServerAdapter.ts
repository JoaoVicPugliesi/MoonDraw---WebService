export interface DocSchema {
  schema: {
    description?: string,
    tags?: Array<string>,
    body?: object,
    response?: Record<number, any>,
    headers?: object,
    params?: object
  },
}

export interface ServerAdapter {
  delete(
    url: string,
    docs: DocSchema,
    callback: (adapter: RequestResponseAdapter) => Promise<any>
  ): void;
  post(
    url: string,
    docs: DocSchema,
    callback: (adapter: RequestResponseAdapter) => Promise<any>
  ): void;
  put(
    url: string,
    docs: DocSchema,
    callback: (adapter: RequestResponseAdapter) => Promise<any>
  ): void;
  get(
    url: string,
    docs: DocSchema,
    callback: (adapter: RequestResponseAdapter) => Promise<any>
  ): void;
  listen(options: { port: number; host: string }): Promise<void>;
  log: { info(msg: string): void; error(msg: Error): void };
  init(): Promise<void>;
  run(): Promise<void>;
}

export interface CookieOptions {
  httpOnly?: boolean;
  secure?: boolean;
  sameSite?: 'lax' | 'strict' | 'none' | boolean;
  path?: string;
  maxAge?: number;
}

export interface RequestResponseAdapter {
  req: {
    body?: any;
    cookies: { [cookieName: string]: string };
    params?: Record<string, any>;
    query?: Record<string, any>;
    headers?: {
      authorization?: string;
    } & Record<string, string | string[] | undefined>;
  };
  res: {
    redirect(url: string, status: number): void;
    setCookie(
      name: string,
      refreshToken: string,
      cookieOptions: CookieOptions
    ): any;
    clearCookie(name: string, cookieOptions?: CookieOptions): any;
    unsignCookie(name: string): any;
    status(statusCode: number): any;
    json(body: any): void;
    send(body?: any): void;
  };
}
