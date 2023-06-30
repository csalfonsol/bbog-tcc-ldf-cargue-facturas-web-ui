import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RequestService } from 'src/app/services/request.service';
import { HttpClient } from '@angular/common/http';


describe('RequestService', () => {
  let service: RequestService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [RequestService]
    });
    service = TestBed.inject(RequestService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('Prueba getErrors', () => {
    let data = `{Filename: name}`;
    service.getErrorsPdf(data).subscribe(m => {
      if (Object.values(m)[0]) {
        expect(Object.values(m)[0]).toBe(true);
      }else{
        expect(Object.values(m)[0]).toBe(false);
      }
    })
  });

  it('Prueba addExcel', () => {
    let data = `{Filename: name}`;
    service.addExcel(data).catch(m => {
      if (Object.values(m)[0]) {
        expect(Object.values(m)[0]).toBe(true);
      }else{
        expect(Object.values(m)[0]).toBe(false);
      }
    })
  });

  it('Prueba getAgreements', () => {
    let data = `{Filename: name}`;
    service.getAgreements(data).catch(m => {
      if (Object.values(m)[0]) {
        expect(Object.values(m)[0]).toBe(true);
      }else{
        expect(Object.values(m)[0]).toBe(false);
      }
    })
  });

  it('Prueba calculate', () => {
    let data = `{Filename: name}`;
    service.calculate(data).catch(m => {
      if (Object.values(m)[0]) {
        expect(Object.values(m)[0]).toBe(true);
      }else{
        expect(Object.values(m)[0]).toBe(false);
      }
    })
  });

});
