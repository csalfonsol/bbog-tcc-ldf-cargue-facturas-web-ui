import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UnauthorizedComponent } from './unauthorized/unauthorized.component';
import { ForbiddenComponent } from './forbidden/forbidden.component';
import { NotFoundComponent } from './not-found/not-found.component';



@NgModule({
  declarations: [
    UnauthorizedComponent,
    ForbiddenComponent,
    NotFoundComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    UnauthorizedComponent,
    ForbiddenComponent,
    NotFoundComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class ErrorModule { }
