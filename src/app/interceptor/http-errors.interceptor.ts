import { Injectable } from '@angular/core';
import {Router} from '@angular/router';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
  HttpStatusCode
} from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable()
export class HttpErrorsInterceptor implements HttpInterceptor {

  constructor(private readonly router: Router) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      catchError((err) => {
          if (err instanceof HttpErrorResponse) {
              if (err.status === HttpStatusCode.NotFound) {
                  this.router.navigateByUrl(environment.pathNotFound);
              }
              else if (err.status === HttpStatusCode.Forbidden) {
                  this.router.navigateByUrl(environment.pathForbidden);
              }
              else if (err.status === HttpStatusCode.Unauthorized) {
                  this.router.navigateByUrl(environment.pathUnauthorized);
              }
          }
          return throwError(() => err);
      }))
  }
}
