import { TestBed } from '@angular/core/testing';

import { DataComponentService } from './data-component.service';

describe('DataComponentService', () => {
  let service: DataComponentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DataComponentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  it('inicializacion variables', () => {
    expect(service.getUpdateRate()).toBe(false);
    expect(service.getRatesToday()).toBe(false);
  });
  it('set update rate', () => {
    service.setFalsyUpdateRate()
    expect(service.getUpdateRate()).toBe(false);
    service.setTruthyUpdateRate()
    expect(service.getUpdateRate()).toBe(true);
  });

  it('set rate today', () => {
    service.setFalsyRatesToday();
    expect(service.getRatesToday()).toBe(false);
    service.setTruthyRatesToday();
    expect(service.getRatesToday()).toBe(true);
  });
});
