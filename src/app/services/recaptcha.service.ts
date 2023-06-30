import { Injectable } from '@angular/core';
import { ReCaptchaV3Service } from 'ng-recaptcha';
import { lastValueFrom } from 'rxjs';


@Injectable({
  providedIn: 'root',
})
export class ReCaptchaService {
  constructor(private readonly recaptchaV3Service: ReCaptchaV3Service) {}

  getReCaptchaToken(action: string) {
    return lastValueFrom(this.recaptchaV3Service.execute(action))
      .then((token) => token)
      .catch(() => undefined);
  }
}
