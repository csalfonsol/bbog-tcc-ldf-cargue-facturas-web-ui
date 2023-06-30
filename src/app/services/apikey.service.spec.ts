import { TestBed } from '@angular/core/testing';
import { environment } from 'src/environments/environment';
import { ApikeyService } from './apikey.service';

describe('ApikeyService', () => {
  let service: ApikeyService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApikeyService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  
  it('should return the API key', () => {
    const apiKey = service.getApiKey();
    expect(apiKey).toEqual(environment.apiKey);
  });
});


