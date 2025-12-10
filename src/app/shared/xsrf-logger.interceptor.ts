
import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable, tap } from 'rxjs';

@Injectable()
export class XsrfLoggerInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const xsrf = req.headers.get('X-XSRF-TOKEN');
    if (xsrf) {
      console.log('[XSRF] Sending header X-XSRF-TOKEN:', xsrf);
    }
    return next.handle(req).pipe(
      tap({
        error: (err) => console.error('[HTTP ERROR]', err)
      })
    );
  }
}
