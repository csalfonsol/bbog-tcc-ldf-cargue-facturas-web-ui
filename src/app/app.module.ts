import { NgModule, CUSTOM_ELEMENTS_SCHEMA, Provider } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';
import { HttpClientModule, HttpClient, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { TasaIBRDTFComponent } from './components/tasa-ibr-dtf/tasa-ibr-dtf.component';
import { LoadInvoiceComponent } from './components/load-invoice/load-invoice.component';
import { PgmainComponent } from './components/pgmain/pgmain.component';
import { AgreementsComponent } from './components/agreements/agreements.component';
import { DonwloadViewComponent } from './components/donwload-view/donwload-view.component';
import { environment } from 'src/environments/environment';
import { RecaptchaV3Module, RECAPTCHA_V3_SITE_KEY, ReCaptchaV3Service} from 'ng-recaptcha';
import { RecaptchaInterceptor } from './interceptor/default-headers.interceptor';
import { HttpErrorsInterceptor } from './interceptor/http-errors.interceptor';

const interceptorProviders: Provider[] = [
  {
    provide: HTTP_INTERCEPTORS,
    useClass: RecaptchaInterceptor,
    multi: true,
  },
  {
    provide: HTTP_INTERCEPTORS,
    useClass: HttpErrorsInterceptor,
    multi: true,
  }
];

@NgModule({
  declarations: [
    AppComponent,
    TasaIBRDTFComponent,
    LoadInvoiceComponent,
    AgreementsComponent,
    PgmainComponent,
    DonwloadViewComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModule,
    HttpClientModule,
    FormsModule,
    RecaptchaV3Module,
  ],
  providers: [
    HttpClient,
    interceptorProviders,
    ReCaptchaV3Service,
    { provide: RECAPTCHA_V3_SITE_KEY, 
      useValue: environment.recaptcha.siteKey 
    }
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  bootstrap: [AppComponent]
})
export class AppModule { }
