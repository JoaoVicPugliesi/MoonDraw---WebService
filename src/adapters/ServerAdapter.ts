export interface ServerAdapter {
  listen(options: { port: number; host: string }): Promise<void>;
  log: { info: (msg: string) => void; error: (msg: Error) => void };
}

export interface RequestResponseAdapter {
  req: { 
    body?: any;
    params?: Record<string, string>;
    query?: Record<string, string | string[]>;
    headers?: Record<string, string>;
  }
  res: {
    status: (statusCode: number) => any;
    json: (body: any) => void;
    send: (body?: any) => void;
  }
}