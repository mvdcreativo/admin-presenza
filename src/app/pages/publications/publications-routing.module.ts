import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PublicationsComponent } from './publications.component';
import { PublicationComponent } from './publication/publication.component';

const routes: Routes = [
  { path: 'publicacion/:id', component: PublicationComponent },

  { path: '', component: PublicationsComponent },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PublicationsRoutingModule { }
