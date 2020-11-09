import { Injectable, EventEmitter, OnInit, OnDestroy } from '@angular/core';
import { User, CurrentUser } from './interfaces/user';
import { Router } from '@angular/router';
import { map, tap, take, first, catchError } from 'rxjs/operators';
import { Observable, BehaviorSubject, Subscription, pipe } from 'rxjs';
import { HttpClient } from '@angular/common/http';

// import { AuthService as AuthServiceSocial, SocialUser  } from "angularx-social-login";
// import { FacebookLoginProvider, GoogleLoginProvider } from "angularx-social-login";

import { environment } from 'src/environments/environment';
// import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class AuthService implements OnInit, OnDestroy{

  private currentUserSubject$: BehaviorSubject<User> = new BehaviorSubject<any>(null);
  public errorSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null)
  public error$: Observable<any>;
  subscriptions : Subscription[]=[]

  // private user: SocialUser;
  private loggedIn: boolean;

  constructor(
    private router: Router,
    private http: HttpClient,
    // public snackBar: MatSnackBar,
    // private authServiceSocial: AuthServiceSocial,

  ) {
    this.error$ = this.errorSubject.asObservable();
    // this.subscriptions.push(
    //   this.error$.subscribe( err => err ? this.router.navigate['/auth/login']: null)
    // )
    // if(this.errorValue) this.router.navigate['/auth/login']
  }

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.

  }

  public get errorValue(): any {
    return this.errorSubject.value;
  }

  public setError(err): any {
    return this.errorSubject.next(err);
  }

  get currentUser(): Observable<User>{
    return this.currentUserSubject$
  }

  /////////////////////////////////
  checkUser(){
    const token = localStorage.getItem('tokenU');
    if(token){
      this.getUserAuth()
      return true
    }else{

      this.currentUserSubject$.next(null);
    }

    return false

  }
/////////////////////////////

//////////////////////////////
  getUserAuth() {
  
      this.http.get<User>(`${environment.API}auth/user`)
      .subscribe(
        res => {
          if(res){
            //actualiza valores de usuario en memoria
            this.currentUserSubject$.next(res)
            
          }
        },
        error => {
          localStorage.removeItem('tokenU');
          this.currentUserSubject$.next(null);
          this.router.navigate(['/auth/login']);
        }
      )

  }
///////////////////////////////

////////////////////////////////
  register(credentials: User): Observable<CurrentUser> {
    return this.http.post<any>(`${environment.API}auth/signup`, credentials)
      .pipe(
        map(res => {
          console.log(res);

          // this.router.navigate(['acceder']);
          // console.log(user);
          if (res?.user?.token) {
            let message, status;
            message = `Hola!! Gracias por egistrarte ${res.user.user.name} `;
            status = 'success';
            // this.snackBar.open(message, '×', { panelClass: [status], verticalPosition: 'top', duration: 5000 });
            console.log(res);

            // store user details ands token in local storage to keep user logged in between page refreshes
            localStorage.setItem('tokenU', JSON.stringify(res?.user?.token));
            this.currentUserSubject$.next(res?.user?.user);
            // this.router.navigate(['admin'])
            // console.log(user);

          }


          return res;
        }),
      );
  }
////////////////////////////////////

////////////////////////////////////
  login(credentials: User): Observable<CurrentUser> {
    return this.http.post<any>(`${environment.API}auth/login`, credentials)
      .pipe(
        map(res => {
          console.log(res);
          
          // login successful if there's a jwt token in the response
          if (res?.token) {
            // store user details ands token in local storage to keep user logged in between page refreshes
            localStorage.setItem('tokenU', JSON.stringify(res?.token));
            this.currentUserSubject$.next(res.user);

            let message, status;
            message = `Hola de nuevo ${res.user.name}, gracias por preferirnos!`;
            status = 'success';
            // this.snackBar.open(message, '×', { panelClass: [status], verticalPosition: 'top', duration: 5000 });
            // this.router.navigate(['admin'])
            // console.log(user);

          }

          return res;
        }),
      );
  }
///////////////////////////////////

//////////////////////////////////
  logout() {

    return this.http.get<any>(`${environment.API}auth/logout`)
      .pipe(
        take(1)
      ).subscribe(
        res => {
          console.log(res);
          // remove user from local storage to log user out
          localStorage.removeItem('cartItem');
          localStorage.removeItem('tokenU');
          // this.signOut();
          this.currentUserSubject$.next(null);
          this.router.navigate(['/']);
        },
        error => {
          localStorage.removeItem('cartItem');
          localStorage.removeItem('tokenU');
          this.currentUserSubject$.next(null);
          this.router.navigate(['/']);
        }

      )


  }
///////////////////////////////////////


//////////////////////////////////////
solicitaResetPass(data) {
    return this.http.post<any>(`${environment.API}password/create`, data)
      .pipe(
        take(1)
      ).subscribe(
        res => {
          console.log(res);
          
          let message, status;
            message = res.message;
            status = 'success';
            // this.snackBar.open(message, '×', { panelClass: [status], verticalPosition: 'top', duration: 5000 });
        },
        error => {
          let message, status;
          message = error;
          status = 'error';
          // this.snackBar.open(message, '×', { panelClass: [status], verticalPosition: 'top', duration: 5000 });
        }
        )
      
  }

////////////////////////////////////////////////////
  updatePass(data){
    return this.http.post<any>(`${environment.API}password/reset`, data)
    .pipe(
      take(1)
    )
    .subscribe(
      res => {
        console.log(res);
        
        let message, status;
          message = res.message;
          status = 'success';
          // this.snackBar.open(message, '×', { panelClass: [status], verticalPosition: 'top', duration: 5000 });
      },
      error => {
        let message, status;
        message = error;
        status = 'error';
        // this.snackBar.open(message, '×', { panelClass: [status], verticalPosition: 'top', duration: 5000 });
      }
      
    )
  }

/////////////////////////////////////////

///////////////////////////////////////
  ngOnDestroy(){
    this.subscriptions.map(v=>v.unsubscribe())
  }



  
    // /////LOGIN SOCIAL
    // signInWithGoogle() {
    //   return this.authServiceSocial.signIn(GoogleLoginProvider.PROVIDER_ID).then(
    //     res => {
    //       let credentials: SocialUser = res;
    //       this.http.post<any>(`${environment.API}social-auth`, credentials).pipe(
    //         take(1)).
    //         subscribe(user => {
    //           // login successful if there's a jwt token in the response
    //           if (user && user.token) {
    //             // store user details ands token in local storage to keep user logged in between page refreshes
    //             localStorage.setItem('currentUser', JSON.stringify(user));
    //             this.currentUserSubject$.next(user);
    
    //             let message, status;
    //             message = `Hola de nuevo ${user.user.name}, gracias por preferirnos!`;
    //             status = 'success';
    //             this.snackBar.open(message, '×', { panelClass: [status], verticalPosition: 'top', duration: 5000 });
    //             // this.router.navigate(['admin'])
    //             // console.log(user);
    
    //           }
    
    //           return user;
    //         })
         
    //       // console.log(this.user);
    //       // console.log(res);
    //     });

    // }
   
    // signInWithFB(){
    //   return this.authServiceSocial.signIn(FacebookLoginProvider.PROVIDER_ID)
    //   .then(
    //     res => {
    //       let credentials: SocialUser = res;
    //       this.http.post<any>(`${environment.API}social-auth`, credentials).pipe(
    //         take(1)).
    //         subscribe(user => {
    //           // login successful if there's a jwt token in the response
    //           if (user && user.token) {
    //             // store user details ands token in local storage to keep user logged in between page refreshes
    //             localStorage.setItem('currentUser', JSON.stringify(user));
    //             this.currentUserSubject$.next(user);
    
    //             let message, status;
    //             message = `Hola de nuevo ${user.user.name}, gracias por preferirnos!`;
    //             status = 'success';
    //             this.snackBar.open(message, '×', { panelClass: [status], verticalPosition: 'top', duration: 5000 });
    //             // this.router.navigate(['admin'])
    //             // console.log(user);
    
    //           }
    
    //           return user;
    //         })
         
    //       console.log(this.user);
    //       console.log(res);
    //     });
    // } 
   
    // signOut(): void {
    //   this.authServiceSocial.signOut();
    // }
}
