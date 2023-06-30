import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { environment } from 'src/environments/environment';
import { AgreementsComponent } from './components/agreements/agreements.component';
import { LoadInvoiceComponent } from './components/load-invoice/load-invoice.component';
import { TasaIBRDTFComponent } from './components/tasa-ibr-dtf/tasa-ibr-dtf.component';
import { PgmainComponent } from './components/pgmain/pgmain.component';
import { DonwloadViewComponent } from './components/donwload-view/donwload-view.component';
import { ForbiddenComponent } from './shared/error/forbidden/forbidden.component';
import { UnauthorizedComponent } from './shared/error/unauthorized/unauthorized.component';
import { NotFoundComponent } from './shared/error/not-found/not-found.component';

export const routes: Routes = [
  {path:'', component:PgmainComponent, pathMatch:'full'},
  {path:environment.pathLoadFiles, component:LoadInvoiceComponent},
  {path:environment.pathTasas, component:TasaIBRDTFComponent},
  {path:environment.pathAgreements, component:AgreementsComponent},
  {path:environment.pathDonwload, component:DonwloadViewComponent},
  {path:environment.pathForbidden, component:ForbiddenComponent},
  {path:environment.pathUnauthorized, component:UnauthorizedComponent},
  {path:environment.pathNotFound, component:NotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
