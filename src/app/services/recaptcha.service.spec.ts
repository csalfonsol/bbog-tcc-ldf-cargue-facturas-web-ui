import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { environment } from 'src/environments/environment';
import { ReCaptchaV3Service, RECAPTCHA_V3_SITE_KEY } from 'ng-recaptcha';
import { Observable } from 'rxjs';

import { ReCaptchaService } from 'src/app/services/recaptcha.service'

describe('ReCaptchaService', () => {
  let reCaptchaService: ReCaptchaService;
  let reCaptchaV3Service: ReCaptchaV3Service;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        ReCaptchaV3Service,
        {
          provide: RECAPTCHA_V3_SITE_KEY,
          useValue: environment.recaptcha.siteKey,
        },
      ],
    });

    reCaptchaService = TestBed.inject(ReCaptchaService);
    reCaptchaV3Service = TestBed.inject(ReCaptchaV3Service);
  });

  it('should be created', () => {
    expect(reCaptchaService).toBeTruthy();
  });

  describe('getReCaptchaToken', () => {
    let executeSpy: jest.SpyInstance;

    beforeEach(() => {
      executeSpy = jest.spyOn(reCaptchaV3Service, 'execute');
    });

    afterEach(() => {
      executeSpy.mockReset();
    });

    it('should return tokenCaptcha', (doneFn) => {
      const action = 'test-action';
      const testToken = 'test-recaptcha-token';

      executeSpy.mockImplementation(
        () =>
          new Observable((subscriber) => {
            subscriber.next(testToken);
            subscriber.complete();
          })
      );

      reCaptchaService.getReCaptchaToken(action).then((response) => {
        expect(executeSpy).toBeCalledTimes(1);
        expect(executeSpy).toBeCalledWith(action);
        expect(response).toBe(testToken);
        doneFn();
      });
    });

    it('should return tokenCaptcha undefined', (doneFn) => {
      executeSpy.mockImplementation(() => new Observable((subscriber) => subscriber.error()));

      reCaptchaService.getReCaptchaToken('').then((response) => {
        expect(response).toBeUndefined();
        doneFn();
      });
    });
  });
});
