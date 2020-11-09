import { Component, Input, OnInit } from '@angular/core';
import { MatMenuTrigger } from '@angular/material/menu';
import { ActivatedRoute, Router, RouterEvent } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';
import { User } from 'src/app/pages/users/interfaces/user';

@Component({
  selector: 'mvd-user-menu',
  templateUrl: './user-menu.component.html',
  styleUrls: ['./user-menu.component.scss']
})
export class UserMenuComponent implements OnInit {
  returnUrl: any;
  menuTrigger: MatMenuTrigger;
  currentUser: Observable<User>;

  constructor(
    private router: Router,
    private rutaActiva: ActivatedRoute,
    private _authService: AuthService
  ) { }


  ngOnInit() {
    this.rutaActiva.url.subscribe(
      data =>{
        this.returnUrl = data
      }
    )
    this.currentUser = this._authService.currentUser

    
  }

  public login(){
    this.router.navigate(['/auth/login'], { queryParams: { returnUrl: this.returnUrl } })
  }
  
  public logout(){
    console.log("logout");
    
    return this._authService.logout()
  }

  linkAccound(){
    this.menuTrigger.closeMenu()
    this.router.navigate(['/mi-cuenta']);

  }
}
