import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AccessComponent } from './access/access.component';


const routes: Routes = [
  // {
  //   path : 'acceder',
  //   component : AccessComponent
  // },
  {
    path : 'login',
    component : LoginComponent,
  },
  {
    path : '',
    redirectTo : 'login',
    pathMatch: 'full'
  },
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
