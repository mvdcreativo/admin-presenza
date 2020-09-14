import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NeighborhoodsRoutingModule } from './neighborhoods-routing.module';
import { NeighborhoodsComponent } from './neighborhoods.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [NeighborhoodsComponent],
  imports: [
    CommonModule,
    NeighborhoodsRoutingModule,
    SharedModule
  ]
})
export class NeighborhoodsModule { }
