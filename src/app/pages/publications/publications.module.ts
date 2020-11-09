import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PublicationsRoutingModule } from './publications-routing.module';
import { PublicationsComponent } from './publications.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { PublicationComponent } from './publication/publication.component';
import { FormPublicationComponent } from './publication/form-publication/form-publication.component';


@NgModule({
  declarations: [
    PublicationsComponent,
    PublicationComponent,
    FormPublicationComponent
  ],
  imports: [
    CommonModule,
    PublicationsRoutingModule,
    SharedModule
  ],
  exports: [
    FormPublicationComponent
  ]
})
export class PublicationsModule { }
