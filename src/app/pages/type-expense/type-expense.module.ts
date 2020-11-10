import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TypeExpenseRoutingModule } from './type-expense-routing.module';
import { TypeExpenseComponent } from './type-expense.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [TypeExpenseComponent],
  imports: [
    CommonModule,
    TypeExpenseRoutingModule,
    SharedModule
  ]
})
export class TypeExpenseModule { }
