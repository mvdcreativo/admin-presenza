import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TransactionTypesRoutingModule } from './transaction-types-routing.module';
import { TransactionTypesComponent } from './transaction-types.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [TransactionTypesComponent],
  imports: [
    CommonModule,
    TransactionTypesRoutingModule,
    SharedModule
  ]
})
export class TransactionTypesModule { }
