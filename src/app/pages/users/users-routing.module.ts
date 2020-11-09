import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserComponent } from './user/user.component';

import { UsersComponent } from './users.component';

const routes: Routes = [
  { path: 'usuario/:id', component: UserComponent },
  { path: 'usuario', component: UserComponent },
  { path: '', component: UsersComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersRoutingModule { }
