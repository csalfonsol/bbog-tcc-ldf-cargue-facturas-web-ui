import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable, from, lastValueFrom } from 'rxjs';
import { ReCaptchaService } from 'src/app/services/recaptcha.service';
import { isExternalHttpRequest } from '../utils/http.utils';


@Injectable()
export class RecaptchaInterceptor implements HttpInterceptor {
  constructor(
    private readonly reCaptchaService: ReCaptchaService
  ) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return from(this.handleDefaultHeaders(request, next));
  }

  private async handleDefaultHeaders(request: HttpRequest<unknown>, next: HttpHandler) {
    let handledRequest = request;
    if (!isExternalHttpRequest(request)) {
      const action = `action_${request.method}`;

      const tokenReCaptcha = (await this.reCaptchaService.getReCaptchaToken(action)) || '';

      handledRequest = request.clone({headers: request.headers.set('X-Captcha-Key', tokenReCaptcha) });
    }
    return lastValueFrom(next.handle(handledRequest));
  }
}
