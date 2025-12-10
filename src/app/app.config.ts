import { ApplicationConfig, importProvidersFrom, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { HttpClientXsrfModule, provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { XsrfLoggerInterceptor } from './shared/xsrf-logger.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes),
    provideHttpClient(withInterceptorsFromDi()),
    importProvidersFrom(HttpClientXsrfModule.withOptions({
      cookieName: 'XSRF-TOKEN',
      headerName: 'X-XSRF-TOKEN'
    })),
    { provide: XsrfLoggerInterceptor, useClass: XsrfLoggerInterceptor }
  ]
};
