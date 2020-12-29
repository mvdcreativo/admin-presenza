import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable, of, throwError, timer } from 'rxjs';
import { catchError, mergeMap, retryWhen, tap } from 'rxjs/operators';

import { AuthService } from '../auth.service';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
    constructor(private authService: AuthService) { }
    retryDelay = 2000;
    retryMaxAttempts = 2;

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request)
        .pipe(
          this.retryAfterDelay(),
        );
    }

    retryAfterDelay(): any {
        return retryWhen(errors => {
            return errors.pipe(
                mergeMap((err, count) => {
                    // throw error when we've retried ${retryMaxAttempts} number of times and still get an error
                    if (err.status === 401) {
                        if (err.error.message === "Unauthorized") {
                            this.authService.errorSubject.next('Usuario o contraseña incorrectos')
                        }
                    }
                    if (count === this.retryMaxAttempts) {
                        return throwError(err);
                    }
                    return of(err).pipe(
                        tap(error => console.log(`Retrying ${error.url}. Retry count ${count + 1}`)),
                        mergeMap(() => timer(this.retryDelay))
                    );
                })
            );
        });
    }

}