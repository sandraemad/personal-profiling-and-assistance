import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter, withViewTransitions, withRouterConfig } from '@angular/router';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideToastr } from 'ngx-toastr';
import { withInMemoryScrolling } from '@angular/router';

import { routes } from './app.routes';

// Interceptors
import { errorsInterceptor } from './core/interceptors/errors/errors.interceptor';
import { headerInterceptor } from './core/interceptors/header/header.interceptor';
import { loadingInterceptor } from './core/interceptors/loading/loading.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),

    provideRouter(
      routes,
      withViewTransitions(),
      withInMemoryScrolling({
        scrollPositionRestoration: 'enabled', 
        anchorScrolling: 'enabled'             
      })
    ),

    provideClientHydration(withEventReplay()),

    provideHttpClient(
      withFetch(),
      withInterceptors([
        errorsInterceptor,
        headerInterceptor,
        loadingInterceptor
      ])
    ),

    provideAnimations(),

    provideToastr(),
  ]
};
