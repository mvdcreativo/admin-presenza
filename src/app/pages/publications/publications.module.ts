import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PublicationsRoutingModule } from './publications-routing.module';
import { PublicationsComponent } from './publications.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { PublicationComponent } from './publication/publication.component';


@NgModule({
  declarations: [
    PublicationsComponent,
    PublicationComponent
  ],
  imports: [
    CommonModule,
    PublicationsRoutingModule,
    SharedModule
  ]
})
export class PublicationsModule { }
