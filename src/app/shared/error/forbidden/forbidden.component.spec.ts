import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { Router } from '@angular/router';
import { ForbiddenComponent } from './forbidden.component';
import { RouterTestingModule } from '@angular/router/testing';
import { routes } from 'src/app/app-routing.module';
import { Location } from '@angular/common';


fdescribe('ForbiddenComponent', () => {
  let component: ForbiddenComponent;
  let fixture: ComponentFixture<ForbiddenComponent>;
  let router: Router;
  let location: Location;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule.withRoutes(routes)],
      declarations: [ ForbiddenComponent ]      
    })
    .compileComponents();
  });

  beforeEach(() => {
    router = TestBed.inject(Router)
    location = TestBed.inject(Location)
    fixture = TestBed.createComponent(ForbiddenComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
    router.initialNavigation()
  });

  it('Should go Home', fakeAsync(() => {    
    component.goHome()
    tick()
    expect(location.path()).toBe('/')
  }));
});