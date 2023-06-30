import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';
import { HeaderComponent } from './header.component';

import { Router, Event, NavigationEnd } from '@angular/router';
import { environment } from 'src/environments/environment';
import { dialogMessages } from 'src/app/core/Messages/messages';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientModule, RouterTestingModule], 
      declarations: [ HeaderComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it(`Probar evento ruta`, () => {
    let  ruta = new NavigationEnd(1,"/","/ruta");
    component.eventRoute(ruta);
    expect(component.hidenBtnBack).toBe(true);
    ruta.url="/ruta"
    component.eventRoute(ruta);
    expect(component.hidenBtnBack).toBe(false);
    });
  
    it(`Probar goBack`, () => {
      const event = {
        detail:
        {
          value:"Si, continuar",
        }
      };
      component.currentRoute=environment.pathTasas;
      component.modal.nativeElement.openAlert = () =>{
        return true;
      }
      component.goBack();
      expect(component.messageModal).toEqual(dialogMessages.backHeaderFromRatesMessage);
      component.currentRoute=environment.pathLoadFiles;
      component.goBack();
      expect(component.messageModal).toEqual(dialogMessages.backHeaderFromLoadFMessage);
      expect(component.backRoute).toEqual("");
      component.currentRoute="";
      component.goBack();
      component.btnModal(event);
      expect(component.messageModal).toEqual(dialogMessages.backHeaderFromLoadFMessage);
      component.currentRoute=environment.pathAgreements;
      component.goBack();
      expect(component.messageModal).toEqual(dialogMessages.backHeaderToLoadFMessage);
      expect(component.titleModal).toEqual(dialogMessages.backHeaderToLoadFTitle);
      component.currentRoute=environment.pathDonwload;
      component.goBack();
      expect(component.messageModal).toEqual(dialogMessages.backHeaderFromLDownloadFMessage);
      expect(component.titleModal).toEqual(dialogMessages.backHeaderToLoadFTitle);
      expect( component.String(4)).toEqual("4");
    }); 
    
});