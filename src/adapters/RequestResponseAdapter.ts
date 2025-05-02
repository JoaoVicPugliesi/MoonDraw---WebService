export interface CookieOptions {
    httpOnly?: boolean;
    secure?: boolean;
    sameSite?: 'lax' | 'strict' | 'none' | boolean;
    path?: string;
    maxAge?: number;
  }
  
  export interface RequestResponseAdapter {
    req: {
      ip?: string;
      body?: unknown;
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