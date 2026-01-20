import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { App } from './app/app';
import { provideRouter } from '@angular/router';
import { routes } from './app/app.routes';
import { authInterceptor } from './app/core/interceptors/auth.interceptor';
import { provideHttpClient, withInterceptors } from '@angular/common/http';

/*bootstrapApplication(App, appConfig)
  .catch((err) => console.error(err));
*/
/*
bootstrapApplication(App, {
  providers: [provideRouter(routes), provideAnimations()],
}).catch((err) => console.error(err));
function provideAnimations():
  | import('@angular/core').Provider
  | import('@angular/core').EnvironmentProviders {
  throw new Error('Function not implemented.');
}
*/

bootstrapApplication(App, {
  providers: [
    provideRouter(routes),
    provideAnimations(),
    provideHttpClient(withInterceptors([authInterceptor])),
  ],
});
function provideAnimations():
  | import('@angular/core').Provider
  | import('@angular/core').EnvironmentProviders {
  throw new Error('Function not implemented.');
}
