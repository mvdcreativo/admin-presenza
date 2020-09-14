import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MunicipalitiesComponent } from './municipalities.component';

const routes: Routes = [{ path: '', component: MunicipalitiesComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MunicipalitiesRoutingModule { }
