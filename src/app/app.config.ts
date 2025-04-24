import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { errorsInterceptor } from './core/interceptors/errors/errors.interceptor';
import { provideToastr } from 'ngx-toastr';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }), 
    provideRouter(routes),
    // provideClientHydration(withEventReplay()),
    provideHttpClient(withFetch(),withInterceptors([errorsInterceptor])),
    provideAnimations(),
    provideToastr(),
    // importProvidersFrom(NgxSpinnerModule)
    ]
};
