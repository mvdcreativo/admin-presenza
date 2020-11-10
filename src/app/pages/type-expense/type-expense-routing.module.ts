import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TypeExpenseComponent } from './type-expense.component';

const routes: Routes = [{ path: '', component: TypeExpenseComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TypeExpenseRoutingModule { }
