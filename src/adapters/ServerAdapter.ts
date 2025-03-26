export interface ServerAdapter {
  listen(options: { port: number; host: string }): Promise<void>;
  log: { info: (msg: string) => void; error: (msg: Error) => void };
}
