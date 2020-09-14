import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ResponsePaginate, Response } from 'src/app/shared/interfaces/response';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

import { Currency } from "../interfaces/currency";

@Injectable({
  providedIn: 'root'
})
export class CurrencyService {

  constructor(
    private http: HttpClient
  ) { }

  getCurrencies(): Observable<Currency[]>{
    return this.http.get<Response>(`${environment.API}${environment.routesCRUD.currencies}`).pipe(
      map(v=> v.data)
    )
  }
}
