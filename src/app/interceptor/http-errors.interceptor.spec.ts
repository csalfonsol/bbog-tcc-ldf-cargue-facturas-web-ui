import { HttpErrorsInterceptor } from './http-errors.interceptor';
import { Router } from '@angular/router';
import { HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs';
import { environment } from 'src/environments/environment';


describe('HttpErrorsInterceptor', () => {
  let interceptor: HttpErrorsInterceptor;
  let router: Router;

  beforeEach(() => {
    router = {
      navigateByUrl: jest.fn()
    } as any;
    interceptor = new HttpErrorsInterceptor(router);
  });

  it('should redirect to "V1/access/notFound" when receiving 404 error', (done) => {
    const errorResponse = new HttpErrorResponse({
      status: 404,
      statusText: 'Not Found'
    });
    const handler: HttpHandler = {
      handle: () => throwError(errorResponse)
    };

    interceptor.intercept(new HttpRequest<any>('GET', '/api'), handler).subscribe(
      () => {},
      (error) => {
        expect(router.navigateByUrl).toHaveBeenCalledWith(environment.pathNotFound);
        done();
      }
    );
  });

  it('should redirect to "V1/access/forbidden" when receiving 403 error', (done) => {
    const errorResponse = new HttpErrorResponse({
      status: 403,
      statusText: 'Forbidden'
    });
    const handler: HttpHandler = {
      handle: () => throwError(errorResponse)
    };

    interceptor.intercept(new HttpRequest<any>('GET', '/api'), handler).subscribe(
      () => {},
      (error) => {
        expect(router.navigateByUrl).toHaveBeenCalledWith(environment.pathForbidden);
        done();
      }
    );
  });

  it('should redirect to "V1/access/unauthorized" when receiving 401 error', (done) => {
    const errorResponse = new HttpErrorResponse({
      status: 401,
      statusText: 'Unauthorized'
    });
    const handler: HttpHandler = {
      handle: () => throwError(errorResponse)
    };

    interceptor.intercept(new HttpRequest<any>('GET', '/api'), handler).subscribe(
      () => {},
      (error) => {
        expect(router.navigateByUrl).toHaveBeenCalledWith(environment.pathUnauthorized);
        done();
      }
    );
  });
});