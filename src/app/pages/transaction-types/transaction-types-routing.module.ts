import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TransactionTypesComponent } from './transaction-types.component';

const routes: Routes = [{ path: '', component: TransactionTypesComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TransactionTypesRoutingModule { }
