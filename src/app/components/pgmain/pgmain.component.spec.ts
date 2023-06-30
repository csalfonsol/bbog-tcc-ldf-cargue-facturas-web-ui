import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
import { CUSTOM_ELEMENTS_SCHEMA, ElementRef} from '@angular/core';
import { PgmainComponent } from './pgmain.component';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { TasaIBRDTFComponent } from '../tasa-ibr-dtf/tasa-ibr-dtf.component';
import { LoadInvoiceComponent } from '../load-invoice/load-invoice.component';

describe('PgmainComponent', () => {
  let component: PgmainComponent;
  let fixture: ComponentFixture<PgmainComponent>;
  let router:Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientModule, RouterTestingModule.withRoutes(
        [{path: environment.pathTasas, component: TasaIBRDTFComponent}, {path: environment.pathLoadFiles, component: LoadInvoiceComponent}]
      )], 
      declarations: [ PgmainComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],

    })
    .compileComponents();

    fixture = TestBed.createComponent(PgmainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it(`tasasCargadas debe iniciar 'false'`, () => {
    fixture = TestBed.createComponent(PgmainComponent);
    component = fixture.componentInstance;
    expect(component.ratesCharged).toEqual(false);
    });

  it(`Debe tener la fecha de hoy`, () => {
    let date = new Date()
    let dateString = `${date.getDate()}/${(date.getMonth()+1)}/${date.getFullYear()}`;
    expect(component.dateHoy.toLocaleDateString).toEqual(date.toLocaleDateString);
    component.cargarTasas({detail:{value:"1"}});
    component.cargarTasas({detail:{value:"0"}});
    expect(component.hoy).toEqual(dateString);
    });
    
  it(`Debe comprobar si tasas estan cargadas`, () => {
    component.tasasCargadasLocalS(false, true);
    component.tasasCargadasLocalS(true, true);
    expect(component.ratesCharged).toBe(true);
    });
  
    it(`load invoice is disabled`, () => {
      component.invoiceDisabled = true
      expect(component.invoiceDisabled).toEqual(true);
  });

  it(`test funcion closeBanner()`, () => {
    component.closeBanner({})
    expect(component.invoiceDisabled).toEqual(true);
    expect(component.showText).toEqual(true);
    expect(component.ratesCharged).toEqual(true);
  });
});
