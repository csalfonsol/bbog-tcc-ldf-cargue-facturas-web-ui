import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { dialogMessages } from 'src/app/core/Messages/messages';
import { DonwloadViewComponent } from './donwload-view.component';

describe('DonwloadViewComponent', () => {
  let component: DonwloadViewComponent;
  let fixture: ComponentFixture<DonwloadViewComponent>;
  let windowSpy: any;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientModule, RouterTestingModule],
      declarations: [DonwloadViewComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DonwloadViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  beforeEach(() => {
    windowSpy = jest.spyOn(window, "window", "get");
  });

  afterEach(() => {
    windowSpy.mockRestore();
  });

  it(`should have date`, () => {
    const newDate = new Date();
    component.dateToday = newDate;
    expect(component.dateToday).toEqual(newDate);
    });

  it(`current date`, () => {
    let date = new Date()
    expect(component.dateToday.toLocaleDateString).toEqual(date.toLocaleDateString);
  });

  it(`data should array empty`, () => {
    let dateToday = new Date();
    let day = `${(dateToday.getDate())}`.padStart(2,'0');
    let month = `${(dateToday.getMonth()+1)}`.padStart(2,'0');
    let year = dateToday.getFullYear();
    let file_name = "Consolidado - " + `${day}_${month}_${year}` + '.xlsx'
    expect(component.data).toEqual([{
           "filename": file_name,
           "isDelete": false,
           "isView": false,
           "status": "success",
         }]);
  });

  it(`showBanner should have boolean`, () => {
    component.showBanner = true;
    expect(component.showBanner).toEqual(true);
  });

  it(`showText should have boolean`, () => {
    component.showText = false;
    expect(component.showText).toEqual(false);
  });

  it(`Set loadfile data`, () => {
    const eventFile = { detail: { name: "consolidado.xls" }} as any;
    component.loadFile(eventFile)
    expect(eventFile.detail.name).toEqual("consolidado.xls");

  });

  it(`download file libera`, () => {
    component.donwloadLiberaFile()
    expect(component.showBanner).toEqual(true);

  });

  it(`should loadfiles is empty`, () => {
    component.loadFiles = []
    component.loadFile({detail:{name:""}})
    expect(component.loadFiles).toEqual([]);

  });

  it(`should showbanner is false in closeBanner`, () => {
    component.showBanner = false;
    component.closeBannerDownloadFile({detail:{name:""}})
    expect(component.showBanner).toEqual(false);

  });

  it(`should showtext is true in closeBanner`, () => {
    component.showText = true;
    component.closeBannerDownloadFile({detail:{name:""}})
    expect(component.showText).toEqual(true);

  });

 
  it('should return https://example.com', () => {
    windowSpy.mockImplementation(() => ({
      location: {
        origin: "https://example.com"
      }
    }));
    expect(window.location.origin).toEqual("https://example.com");
  });

  it('should be undefined.', () => {
    windowSpy.mockImplementation(() => undefined);
    expect(window).toBeUndefined();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    
  });

  it('Test function btnModal & goHome', () => {
    component.modal.nativeElement.openAlert = () =>{
      return true;
    }
    const event ={
      detail: {
        value :"Si, continuar"
      }
    }
    component.goHome();
    expect(component.messageModal).toEqual(dialogMessages.backHeaderFromLDownloadFMessage);
    expect(component.titleModal).toEqual(dialogMessages.backHeaderToLoadFTitle);
    component.btnModal(event);
    expect(component.messageModal).toEqual("");
    expect(component.titleModal).toEqual("");
    
  });
});
