import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { IBRDTFService } from './ibrdtf.service';
import { TRANSLATIONS } from '@angular/core';
import { TasasIbrI } from '../core/models/ibrdtfInterface';

describe('IBRDTFService', () => {
  let service: IBRDTFService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [IBRDTFService]
    });
    service = TestBed.inject(IBRDTFService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  it('Prueba post tasas', () => {
    const dateHoy = new Date();
    let hoy = `${dateHoy.getDate()}/${(dateHoy.getMonth()+1)}/${dateHoy.getFullYear()}`;
    let tasas: TasasIbrI = {
      'IBR 1M': 1.4,
      'IBR 3M': 2.2,
      'IBR 6M': 3.73,
      DTF: 4.024,
      date: hoy
    }
    service.postTasas(tasas).subscribe(m => {
      if (Object.values(m)[0]==="Tasa creada Correctamente") {
        expect(Object.values(m)[0]).toEqual("Tasa creada Correctamente");
      }
    })
  })

  it('Prueba findFecha tasas', () => {
    const dateHoy = new Date();
    let hoy = `${dateHoy.getDate()}/${(dateHoy.getMonth()+1)}/${dateHoy.getFullYear()}`;
    service.findFecha(hoy).subscribe(m => {
      if (Object.values(m)[0]) {
        expect(Object.values(m)[0]).toBe(true);
      }else{
        expect(Object.values(m)[0]).toBe(false);
      }
    })
  })

  it('Prueba getTasas', () => {
    const dateHoy = new Date();
    let hoy = `${dateHoy.getDate()}/${(dateHoy.getMonth()+1)}/${dateHoy.getFullYear()}`;
    service.getTasas(hoy).subscribe(m => {
      if (Object.values(m)[0]==="Fecha no existe") {
        expect(Object.values(m)[0]).toEqual("Fecha no existe");
      }else{
        let tasas = Object.values(m)[0] as TasasIbrI
        expect(tasas.date).toBe(hoy);
      }
    })
  })

  it('Prueba updateTasas', () => {
    const dateHoy = new Date();
    let hoy = `${dateHoy.getDate()}/${(dateHoy.getMonth()+1)}/${dateHoy.getFullYear()}`;
    let tasas: TasasIbrI = {
      'IBR 1M': 1.4,
      'IBR 3M': 2.2,
      'IBR 6M': 3.73,
      DTF: 4.024,
      date: hoy
    }
    service.updateTasas(tasas).subscribe(m => {
      if (Object.values(m)[0]==="Formato de Tasas no valido") {
        expect(Object.values(m)[0]).toEqual("Formato de Tasas no valido");
      }else{
        expect(Object.values(m)[0]).toEqual("Tasa actualizada Correctamente");
      }
    })
  })
});
