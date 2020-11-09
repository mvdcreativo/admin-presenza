import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BehaviorSubject, Observable } from 'rxjs';
import { ResponsePaginate } from 'src/app/shared/interfaces/response';
import { environment } from 'src/environments/environment';
import { take, map } from 'rxjs/operators';
import { Response } from "src/app/shared/interfaces/response";

import { TransactionType } from "./../interfaces/transaction-type";


@Injectable({
  providedIn: 'root'
})
export class TransactionTypesService {

  constructor(
    private http: HttpClient,
    private snackBar: MatSnackBar
  ) { }



  private resultSubject$: BehaviorSubject<ResponsePaginate> = new BehaviorSubject(null)
  public get resultItems$() {
    return this.resultSubject$
  }
  public setItems(value) {
    this.resultSubject$.next(value)
  }

  storeTransactionType(data): Observable<TransactionType>{
    return this.http.post<Response>(`${environment.API}${environment.routesCRUD.transactionTypes}`, data).pipe(
      map( v => {
        this.getTransactionTypes(1, 20, '', 'desc').pipe(take(1)).subscribe()
        //snacbarr
        this.openSnackBar('Se creó correctamente','success-snack-bar')
        //////////
        return v.data
      })
    )

  }

  updateTransactionType(data): Observable<TransactionType>{
    return this.http.put<Response>(`${environment.API}${environment.routesCRUD.transactionTypes}/${data.id}`, data).pipe(
      map( v => {
        this.getTransactionTypes(1, 20, '', 'desc').pipe(take(1)).subscribe()
        //snacbarr
        this.openSnackBar('Actualizado correctamente','success-snack-bar')
        //////////
        return v.data
      })
    )

  }

  ///listar
  getTransactionTypes(currentPage = 1, perPage = 20, filter = '', sort = 'desc'): Observable<ResponsePaginate> {
    return this.http.get<ResponsePaginate>(`${environment.API}${environment.routesCRUD.transactionTypes}`, {
      params: new HttpParams()
        .set('page', currentPage.toString())
        .set('filter', filter)
        .set('sort', sort)
        .set('per_page', perPage.toString())

    }).pipe(map(
      res => {
        console.log(res);


        this.setItems(res)
        const resp = res
        return resp;
      }
    )
    )
  }


  deleteTransactionType(id){
    return this.http.delete<Response>(`${environment.API}${environment.routesCRUD.transactionTypes}/${id}`).pipe(
      map( v => {
        // console.log(v.data);
        
        this.getTransactionTypes(1, 20, '', 'desc').pipe(take(1)).subscribe()
        //snacbarr
        this.openSnackBar('Eliminado correctamente','success-snack-bar')
        //////////
        return v.data
        
      })
    )
  }



  openSnackBar(message: string, refClass: string, action: string = '') {
    this.snackBar.open(message, action, {
      duration: 1000,
      horizontalPosition: 'center',
      verticalPosition: 'top',
      panelClass: refClass
    });
  }


}
