import { FastifyReply, FastifyRequest } from 'fastify';
import { RequestResponseAdapter } from '../../adapters/ServerAdapter';
import { CookieOptions } from 'react-router';

export class FastifyRequestResponseAdapter implements RequestResponseAdapter {
  constructor(
    private readonly request: FastifyRequest,
    private readonly reply: FastifyReply
  ) {}

  get req() {
    return {
      cookies: this.request.cookies,
      body: this.request.body,
      params: this.request.params as Record<string, string>,
      query: this.request.query as Record<string, string | string[]>,
      headers: this.request.headers as Record<string, string>,
    };
  }

  get res() {
    return {
      setCookie: (name: string, refreshToken: string, cookieOptions: CookieOptions) => {
        this.reply.setCookie(name, refreshToken, cookieOptions);
      },
      clearCookie: (name: string, cookieOptions: CookieOptions) => {
        this.reply.clearCookie(name, cookieOptions);
      },
      unsignCookie: (name: string) => {
        this.reply.unsignCookie(name);
      },
      status: (statusCode: number) => {
        this.reply.code(statusCode);
        return this.res;
      },
      json: (body: any) => this.reply.send(body),
      send: (body?: any) => this.reply.send(body),
    };
  }
}
