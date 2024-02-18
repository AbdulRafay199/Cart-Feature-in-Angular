import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideStore } from '@ngrx/store';
import { metaReducers, reducers } from './reducers';
import { provideHttpClient } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';
import { StripeElementsService, StripeFactoryService, provideNgxStripe } from 'ngx-stripe';
// import { CurrencyPipe } from '@angular/common';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes), provideHttpClient(), provideStore(reducers, { metaReducers }), provideAnimations(),provideNgxStripe('pk_test_51OicpKFcIATMhxWQc6PRGeHb9FDOm2gQR8VGJVLMpxsohgcJFLuItYfdvE3o5tOA6F17VAy79VQZy2oQXBMxnYvl00Dw4F1a23')]
};
