import { ApplicationConfig, importProvidersFrom, provideZoneChangeDetection } from '@angular/core';
import { PreloadAllModules, provideRouter, withEnabledBlockingInitialNavigation, withInMemoryScrolling, withPreloading, withRouterConfig } from '@angular/router';

import { routes } from './app.routes';
import { TranslateModule } from '@ngx-translate/core';
import { OrchestratorModule } from './orchestrator/orchestrator.module';
// import { SocketIoModule } from '@core/socket-io';
import { provideServiceWorker } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { HTTP_INTERCEPTORS, provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { provideHotToastConfig } from '@ngneat/hot-toast';
import { ApiPrefixInterceptor } from './@core/interceptors';

/**
 * Application configuration object for Angular app.
 *
 * - `provideZoneChangeDetection`: Enables zone-based change detection with event coalescing.
 * - `importProvidersFrom`: Imports providers from external modules (e.g., TranslateModule, OrchestratorModule).
 * - `provideServiceWorker`: Registers Angular service worker with specified options for PWA support.
 * - `provideRouter`: Configures Angular router with custom settings:
 *    - `withRouterConfig`: Sets router options like navigation and parameter inheritance.
 *    - `withEnabledBlockingInitialNavigation`: Enables blocking initial navigation until app is stable.
 *    - `withInMemoryScrolling`: Enables scroll position and anchor scrolling restoration.
 *    - `withPreloading`: Preloads all lazy-loaded modules after app startup.
 */
export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    
    // import providers from other modules
    importProvidersFrom(
      TranslateModule.forRoot(),
      OrchestratorModule,
      // SocketIoModule.forRoot({
      //   rootUrl: null, // TODO: provide your own socket.io server URL
      //   options: {
      //     transports: ['websocket'],
      //   },
      // }),
    ),
     // provideServiceWorker is required for Angular's service workers
    provideServiceWorker('ngsw-worker.js', {
      enabled: environment.production,
      scope: '/',
      registrationStrategy: 'registerWhenStable:30000',
    }),

    provideRouter(
      routes,
      withRouterConfig({
        onSameUrlNavigation: 'reload',
        paramsInheritanceStrategy: 'always',
      }),
      withEnabledBlockingInitialNavigation(),
      withInMemoryScrolling({
        scrollPositionRestoration: 'enabled',
        anchorScrolling: 'enabled',
      }),
      withPreloading(PreloadAllModules)
    ),

    // provideHotToastConfig is required for HotToastModule by ngneat
    provideHotToastConfig({
      reverseOrder: true,
      dismissible: true,
      autoClose: true,
      position: 'top-right',
      theme: 'snackbar',
    }),

    // provideHttpClient is required for Angular's HttpClient with additional configuration, which includes interceptors from DI (dependency injection) , means to use class based interceptors
    provideHttpClient(withInterceptorsFromDi()),
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ApiPrefixInterceptor,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorHandlerInterceptor,
      multi: true,
    },
    {
      provide: RouteReuseStrategy,
      useClass: RouteReusableStrategy,
    },
  ]
};
