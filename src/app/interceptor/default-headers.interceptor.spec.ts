import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HTTP_INTERCEPTORS, HttpClient, HttpRequest } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { RecaptchaInterceptor } from './default-headers.interceptor';
import { ReCaptchaService } from 'src/app/services/recaptcha.service';

describe('RecaptchaInterceptor', () => {
  let interceptor: RecaptchaInterceptor;
  let httpMock: HttpTestingController;
  let httpClient: HttpClient;
  let reCaptchaServiceMock: Partial<ReCaptchaService>;

  beforeEach(() => {
    reCaptchaServiceMock = {
      getReCaptchaToken: jest.fn().mockReturnValue(of('fakeToken'))
    };

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        { provide: ReCaptchaService, useValue: reCaptchaServiceMock },
        { provide: HTTP_INTERCEPTORS, useClass: RecaptchaInterceptor, multi: true },
        RecaptchaInterceptor
      ]
    });

    interceptor = TestBed.inject(RecaptchaInterceptor);
    httpMock = TestBed.inject(HttpTestingController);
    httpClient = TestBed.inject(HttpClient);
  });

  afterEach(() => {
    httpMock.verify();
  });

  
  it('should not add X-Captcha-Key header to external requests', (done) => {
    const externalUrl = 'https://api.example.com/data';
    const data = { id: 1 };

    httpClient.post(externalUrl, data).subscribe(() => {
      done();
    });

    const httpRequest = httpMock.expectOne(externalUrl);
    expect(httpRequest.request.headers.has('X-Captcha-Key')).toBe(false);

    httpRequest.flush({});
  });
});