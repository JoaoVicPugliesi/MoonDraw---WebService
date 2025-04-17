export interface ServerAdapter {
  delete(
    url: string,
    callback: (adapter: RequestResponseAdapter) => Promise<any>
  ): void;
  post(
    url: string,
    callback: (adapter: RequestResponseAdapter) => Promise<any>
  ): void;
  put(
    url: string,
    callback: (adapter: RequestResponseAdapter) => Promise<any>
  ): void;
  get(
    url: string,
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
    query?: Record<string, string | string[]>;
    headers?: {
      authorization?: string;
    } & Record<string, string | string[] | undefined>;
  };
  res: {
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
