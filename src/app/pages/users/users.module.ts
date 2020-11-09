import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsersRoutingModule } from './users-routing.module';
import { UsersComponent } from './users.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { UserComponent } from './user/user.component';
import { FormUserComponent } from './user/form-user/form-user.component';
import { ExpensesComponent } from './user/expenses/expenses.component';


@NgModule({
  declarations: [UsersComponent, UserComponent, FormUserComponent, ExpensesComponent],
  imports: [
    CommonModule,
    UsersRoutingModule,
    SharedModule
  ]
})
export class UsersModule { }
