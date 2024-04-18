import { ExceptionFilter, Catch, ArgumentsHost, HttpException, HttpStatus } from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';

@Catch()
export class FiltroDeExcecaoGlobal implements ExceptionFilter {
  constructor(private adapterHost: HttpAdapterHost) { }

  catch(exception: unknown, host: ArgumentsHost) {

    const { httpAdapter } = this.adapterHost;
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();

    const { status, body } =
      exception instanceof HttpException
        ? {
          status: exception.getStatus(),
          body: exception.getResponse()
        }
        : {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          body: {
            timestamp: new Date().toISOString(),
            path: httpAdapter.getRequestUrl(request),
          }
        };

    httpAdapter.reply(response, body, status);
  }
};