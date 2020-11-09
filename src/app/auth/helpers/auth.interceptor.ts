import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Injectable()

export class AuthInterceptor implements HttpInterceptor {
    constructor(
        private router : Router,
        private  authService: AuthService
    ) {}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const requestUrl: Array<any> = req.url.split('/');
        const apiUrl: Array<any> = environment.APIAuth.split('/');
        // console.log(apiUrl);
        // console.log(requestUrl);
        
        let accderUrl = `${environment.APIAuth}login`;
        let register = `${environment.APIAuth}signup`;
        // console.log(accderUrl);
        // console.log(req.url);
        
        
        if( requestUrl[2] === apiUrl[2]
            && req.url !== accderUrl
            && req.url !== register){
                // console.log();
            if(localStorage.getItem('tokenU')){
                const currentUser = localStorage.getItem('tokenU');
                const token = JSON.parse(currentUser);
                // console.log(token);
                if(token){
                    // console.log(token)
                    const headers = req.headers
                    .set('Authorization', `Bearer ${token}`);
                    const authReq = req.clone({ headers });
                    return next.handle(authReq);
                }
            }else{
                // this.authService.getUserAuth()
                return next.handle(req);
            }
            
        }else{
            return next.handle(req);
        }
    }
}