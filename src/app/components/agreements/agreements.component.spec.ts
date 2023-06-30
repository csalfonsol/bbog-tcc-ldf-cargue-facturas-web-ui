import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { CUSTOM_ELEMENTS_SCHEMA, ElementRef } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';
import { AgreementsComponent } from './agreements.component';
import { RequestService } from 'src/app/services/request.service';



describe('AgreementsComponent', () => {
  let component: AgreementsComponent;
  let fixture: ComponentFixture<AgreementsComponent>;
  let requestService: RequestService;
  

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      imports: [HttpClientModule, RouterTestingModule],
      declarations: [AgreementsComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AgreementsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // it('Prueba Get Data From LocalStorage', async () => {
  //   const mock = [
  //     {
  //       "Desembolso Desde": "EXPEDICIÓN",
  //       "Nombre Deudor": "D1 SAS",
  //       "Nombre Proveedor": "AZUL K SAS",
  //       "Plazo Descuento": 0,
  //       "Spread": 2,
  //       "Tasa": "IBR 1M"
  //     },
  //     {
  //       "Desembolso Desde": "EXPEDICIÓN",
  //       "Nombre Deudor": "D1 SAS",
  //       "Nombre Proveedor": "AZUL K SAS",
  //       "Plazo Descuento": 0,
  //       "Spread": 2,
  //       "Tasa": "IBR 1M"
  //     },
  //   ]
  //   const req = { filename1: "name" };
  //   localStorage.setItem("localLoadedFiles", '[{"filename1":"name"}]');
  //   nock(environment.agreementsUrl).post("", req).reply(200, mock);
  //   // const response = component.getDataFromLocalStorage();
  //   component.getDataFromLocalStorage();
  //   localStorage.clear();
  // });

  it('prueba filtradoAcuerdos', () => {
    const Array1 =
      [
        {
          "Desembolso Desde": "EXPEDICIÓN",
          "Nombre Deudor": "D1 SAS",
          "Nombre Proveedor": "AZUL K SAS",
          "Plazo Descuento": 0,
          "Spread": 2,
          "Tasa": "IBR 1M"
        },
        {
          "Desembolso Desde": "EXPEDICIÓN",
          "Nombre Deudor": "D1 SAS",
          "Nombre Proveedor": "AZUL K SAS",
          "Plazo Descuento": 0,
          "Spread": 2,
          "Tasa": "IBR 1M"
        },
      ]

    const Array2 =
      [
        {
          "Desembolso Desde": "EXPEDICIÓN",
          "Nombre Deudor": "Exito",
          "Nombre Proveedor": "ChocoRamo",
          "Plazo Descuento": 0,
          "Spread": 2,
          "Tasa": "IBR 3M"
        },
        {
          "Desembolso Desde": "EXPEDICIÓN",
          "Nombre Deudor": "Exito",
          "Nombre Proveedor": "ChocoRamo",
          "Plazo Descuento": 0,
          "Spread": 2,
          "Tasa": "IBR 3M"
        },
      ]
    const responseArray = [Array1, Array2];
    expect(component.filterAgreements(responseArray).length).toBe(2);
  });

  it('prueba gridPush', () => {
    const responseToFilter =
      [
        {
          "Desembolso Desde": "EXPEDICIÓN",
          "Nombre Deudor": "D1 SAS",
          "Nombre Proveedor": "AZUL K SAS",
          "Plazo Descuento": 0,
          "Spread": 2,
          "Tasa": "IBR 1M"
        },
        {
          "Desembolso Desde": "EXPEDICIÓN",
          "Nombre Deudor": "D1 SAS",
          "Nombre Proveedor": "AZUL K SAS",
          "Plazo Descuento": 0,
          "Spread": 2,
          "Tasa": "IBR 1M"
        },
      ]
    component.gridPushToHtml(responseToFilter);
    expect(component.agreementsGrid.length).toBeGreaterThan(0);
  });

  it('Prueba splitDataLoad',async () => {
      const object = {
        "fileName": "facturas_24_03_23.xlsx",
        "data": [
            {
                "NRO FACTURA": "0026656649",
                "CUFE/CUDE": "9bec6b45677322b365075dcc7c254e394116a41184ad9c29295925124b5f5846d4a6fc51dae2d6a6f93844b0603b29ca",
                "FECHA EXPEDICIÓN FACTURA": 44999,
                "FECHA VENCIMIENTO PROVEEDOR": 45029,
                "NOMBRE PROVEEDOR": "MONOMEROS COLOMBO VENEZOLANOS",
                "NIT PROVEEDOR": "8600204395",
                "NOMBRE DEUDOR": "AGROEXPORT",
                "NIT DEUDOR": "8600484293",
                "VALOR FACTURA RADIAN": 20050000,
                "VALOR FACTURA DESEMBOLSO": 20050000
            }
        ]
      };
      const expected = {
        "Response": "Cargue exitoso de facturas"
      };
      let serviceMock = {
        calculate: async (data: any) => {
          return expected
        }
      };
      const splitResponse = await component.splitDataLoad(object, serviceMock);
      expect(splitResponse).toEqual(expected);
  });

  test('prueba loader',  () => {
      component.longTimeLoader(0);
      expect(component.typeLoader).toEqual("longTime");
      component.startShortTimeLoader();
      expect(component.typeLoader).toEqual("shortTime");
      component.stepsLoaderLong(1,[""],2)
      expect(component.modalLoader).toBe(false);
      component.endLoader();
      component.endByTimeShortTimeLoader(0);
      expect(component.modalLoader).toBe(false);
    });
});
