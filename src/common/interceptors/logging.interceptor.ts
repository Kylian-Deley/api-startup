import {
    Injectable,
    NestInterceptor,
    ExecutionContext,
    CallHandler,
  } from '@nestjs/common';
  import { Observable } from 'rxjs';
  import { tap } from 'rxjs/operators';
  
  @Injectable()
  export class LoggingInterceptor implements NestInterceptor {
    intercept(
      context: ExecutionContext,
      next: CallHandler,
    ): Observable<any> {
      const req = context.switchToHttp().getRequest();
      const method = req.method;
      const url = req.url;
      const now = Date.now();
      console.log(`[Request] ${method} ${url}`);
      return next.handle().pipe(
        tap(() => console.log(`[Response] ${method} ${url} - ${Date.now() - now}ms`)),
      );
    }
  }
  