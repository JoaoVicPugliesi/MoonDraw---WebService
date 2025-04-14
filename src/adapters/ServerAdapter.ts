export interface ServerAdapter {
  register(
    x: any,
    options?: {
      credentials?: boolean;
      origin?: string | string[];
      methods?: string | string[];
      allowedHeaders?: string | string[];
    }
  ): Promise<void>;
  listen(options: { port: number; host: string }): Promise<void>;
  log: { info(msg: string): void; error(msg: Error): void };
}

export interface CookieOptions {
  httpOnly?: boolean; 
  secure?: boolean; 
  sameSite?:  "lax" | "strict" | "none" | boolean; 
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
    setCookie(name: string, refreshToken: string, cookieOptions: CookieOptions): any;
    clearCookie(name: string, cookieOptions?: CookieOptions): any;
    unsignCookie(name: string): any;
    status(statusCode: number): any;
    json(body: any): void;
    send(body?: any): void;
  };
}
