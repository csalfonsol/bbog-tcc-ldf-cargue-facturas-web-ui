import { TestBed } from '@angular/core/testing';

import { EncryptService } from './encrypt.service';

describe('EncryptService', () => {
  let service: EncryptService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EncryptService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  it('Test encrypt', () => {
      const text = {
        'name':"Andrey",
        'rol':'Desarrollador'
      };
      const textEncrypt = service.encrypt(JSON.stringify(text));
      expect(JSON.parse(service.deencrypt(textEncrypt))).toEqual(text);
      console.log(text);
      console.log(textEncrypt);
  });

});
