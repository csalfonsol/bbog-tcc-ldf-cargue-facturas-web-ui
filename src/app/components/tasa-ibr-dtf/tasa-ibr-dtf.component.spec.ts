import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
import { CUSTOM_ELEMENTS_SCHEMA, ElementRef} from '@angular/core';
import { TasaIBRDTFComponent } from './tasa-ibr-dtf.component';
import { TasasIbrI } from 'src/app/core/models/ibrdtfInterface';
import { IBRDTFService } from 'src/app/services/ibrdtf.service';

describe('TasaIBRDTFComponent', () => {
  let component: TasaIBRDTFComponent; 
  let fixture: ComponentFixture<TasaIBRDTFComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientModule, RouterTestingModule], 
      declarations: [ TasaIBRDTFComponent ],
      providers:[IBRDTFService],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  });
  
  beforeEach(() => {
    fixture = TestBed.createComponent(TasaIBRDTFComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it(`should have date`, () => {
    fixture = TestBed.createComponent(TasaIBRDTFComponent);
    component = fixture.componentInstance;
    const newDate = new Date();
    component.dateToday = newDate;
    expect(component.dateToday).toEqual(newDate);
    });
    
  // it(`Debe hacer match con el snapshot`, () => {
  //   fixture.detectChanges();
  //   const compiled = fixture.nativeElement as HTMLElement;
  //   expect(compiled).toMatchSnapshot();
  //   });  

  it(`Debe tener la fecha de hoy`, () => {
    let date = new Date()
    let dateString = `${date.getDate()}/${(date.getMonth()+1)}/${date.getFullYear()}`;
    expect(component.dateToday.toLocaleDateString).toEqual(date.toLocaleDateString);
    expect(component.today).toEqual(dateString);
    });

  it(`Debe iniciar sin la opcion de actualizar`, () => {
    expect(component.tasasActualizar).toBe(false);
    });
  it(`debe iniciar el campos ibr1 vacio`, () => {
    expect(component.objectRates[1].text).toEqual("");
    });

  it(`debe iniciar el campos ibr3 vacio`, () => {
    expect(component.objectRates[2].text).toEqual("");
    });

  it(`debe iniciar el campos ibr6 vacio`, () => {
    expect(component.objectRates[3].text).toEqual("");
    });

  it(`debe iniciar el campos dtf vacio`, () => {
    expect(component.objectRates[0].text).toEqual("");
    });

  it(`Se debe habilitar el campos ibr1`, () => {
    component.enableInput();
    expect(component.objectRates[1].status).toEqual("ENABLED");
    });

  it(`Se debe habilitar el campos ibr3`, () => {
    component.enableInput();
    expect(component.objectRates[2].status).toEqual("ENABLED");
    });

  it(`Se debe habilitar el campos ibr6`, () => {
    component.enableInput();
    expect(component.objectRates[3].status).toEqual("ENABLED");
    });

  it(`Se debe habilitar el campos dtf`, () => {
    component.enableInput();
    expect(component.objectRates[0].status).toEqual("ENABLED");
    });

  it(`Debe deshabilitar el campos dtf`, () => {
    component.disableInput();
    expect(component.objectRates[0].status).toEqual("DISABLED");
    });
  
  it(`Se debe deshabilitar el campos ibr1`, () => {
    component.disableInput();
    expect(component.objectRates[1].status).toEqual("DISABLED");
    });

  it(`Se debe deshabilitar el campos ibr3`, () => {
    component.disableInput();
    expect(component.objectRates[2].status).toEqual("DISABLED");
    });

  it(`Se debe deshabilitar el campos ibr6`, () => {
    component.disableInput();
    expect(component.objectRates[3].status).toEqual("DISABLED");
    });
    
  it(`Mensaje de error de tasas`, () => {
    expect(component.txtMsg).toEqual("El valor no es valido");
    });

  it(`Validar campos vacios`, () => {
    expect(component.validarCampoOK("")).toBe("Este campo no puede quedar vacío");
    });

  it(`Validar 2 puntos o mas`, () => {
    expect(component.validarCampoOK("2..3")).toBe("El valor no es valido");
    });

  it(`Validar cero`, () => {
    expect(component.validarCampoOK("0")).toBe("El valor debe ser mayor a 0% y menor o igual a 30%");
    });

  it(`Validar numeros mayores de 100`, () => {
    expect(component.validarCampoOK("101")).toBe("El valor debe ser mayor a 0% y menor o igual a 30%");
    });

  it(`Validar numeros ok`, () => {
    expect(component.validarCampoOK("30")).toBe("-1");
    });

  it(`Validar caracteres letrasespeciales`, () => {
    expect(component.quitarCaracteres("123lpo+?.-32)(")).toEqual("123.32");
    });

  let tasas: TasasIbrI = {
    'IBR 1M': 1.4,
    'IBR 3M': 2.2,
    'IBR 6M': 3.73,
    DTF: 4.024,
    date: "09/12/2022"
  }

  it(`Set tasas ibr1m`, () => {
    component.setTasas(tasas)
    expect(component.objectRates[1].text).toEqual("1.4 %");
    });

  it(`Set tasas ibr3m`, () => {
    component.setTasas(tasas)
    expect(component.objectRates[2].text).toEqual("2.2 %");
    });

  it(`Set tasas ibr6m`, () => {
    component.setTasas(tasas)
    expect(component.objectRates[3].text).toEqual("3.73 %");
    });

  it(`Set tasas dtf`, () => {
    component.setTasas(tasas);
    expect(component.objectRates[0].text).toEqual("4.024 %");
    });

  it(`Debe permitir editar tasas`, () => {
    component.btnEditar();
    expect(component.tasasCargadas).toBe(false);
    expect(component.tasasActualizar).toBe(true);
    });

  it(`Tasas cargadas`, () => {
    component.tasasFinded(tasas);
    expect(component.tasasCargadas).toBe(true);
    expect(component.objectRates[1].status).toEqual("ENABLED");
    expect(component.objectRates[2].status).toEqual("ENABLED");
    expect(component.objectRates[3].status).toEqual("ENABLED");
    expect(component.objectRates[0].status).toEqual("ENABLED");
    
    });

  it(`Probar evento blur`, () => {
    const eventDtf = { target: { value: '23' , label:"dtf"} } as any;
    const eventIbr1 = { target: { value: '12' , label:"ibr1m"} } as any;
    const eventIbr3 = { target: { value: '12' , label:"ibr3m"} } as any;
    const eventIbr6 = { target: { value: '3' , label:"ibr6m"} } as any;
    const pub = { target: { value: '' , label:""} } as any;
    component.validarPorcentaje(eventDtf);
    component.blurEvent(eventDtf,0);
    expect(component.objectRates[0].status).toEqual("ENABLED");
    component.blurEvent(eventIbr1,1);
    expect(component.objectRates[1].status).toEqual("ENABLED");
    component.blurEvent(eventIbr3,2);
    expect(component.objectRates[2].status).toEqual("ENABLED");
    component.blurEvent(eventIbr6,3);
    expect(component.objectRates[3].status).toEqual("ENABLED");
    component.blurEvent(pub,0);
    });
    
  it(`boton Aceptar`, () => {
    let date = new Date()
    let dateString = `${date.getDate()}/${(date.getMonth()+1)}/${date.getFullYear()}`;
    component.objectRates[1].text="1";
    component.objectRates[2].text="1";
    component.objectRates[3].text="1";
    component.objectRates[0].text="1";
    component.BtnAceptar();
    expect(component.tasas.DTF).toEqual(1);
    expect(component.tasas['IBR 1M']).toEqual(1);
    expect(component.tasas['IBR 6M']).toEqual(1);
    expect(component.tasas['IBR 6M']).toEqual(1);
    component.setTasas(tasas)
    component.tasasActualizar=true
    component.BtnAceptar();
    component.tasasActualizar=false
    component.BtnAceptar();
    component.regresar();
    expect(component.tasas.date).toEqual(dateString);
    component.closeBanner();
    expect(component.showToast).toBe(false);
    });
    it(`Hide Skeleton Show Component`, () => {
      component.hideSkeletonShowComponent()
      expect(component.showSkeleton).toBe(false);
      expect(component.showComponent).toBe(true);
    });
    it(`Test FindedTasas`, () => {
      const dataJsonTrue = {
        "Found": true
      }
      const dataJsonFalse = {
        "Found": false
      }
      component.findedTasas(dataJsonTrue);
      component.findedTasas(dataJsonFalse);
      expect(component.showSkeleton).toBe(false);
      expect(component.showComponent).toBe(true);
    });
});