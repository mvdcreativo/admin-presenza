import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MunicipalitiesRoutingModule } from './municipalities-routing.module';
import { MunicipalitiesComponent } from './municipalities.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [MunicipalitiesComponent],
  imports: [
    CommonModule,
    MunicipalitiesRoutingModule,
    SharedModule
  ]
})
export class MunicipalitiesModule { }
