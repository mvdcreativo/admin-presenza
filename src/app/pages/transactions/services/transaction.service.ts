import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { ResponsePaginate, Response } from 'src/app/shared/interfaces/response';
import { environment } from 'src/environments/environment';
import { Transaction } from "../interfaces/transaction";

@Injectable({
  providedIn: 'root'
})
export class TransactionService {

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

  storeTransaction(data): Observable<Transaction>{
    return this.http.post<Response>(`${environment.API}${environment.routesCRUD.transactions}`, data).pipe(
      map( v => {
        this.getTransactions(1, 20, '', 'desc').pipe(take(1)).subscribe()
        //snacbarr
        this.openSnackBar('Se creó correctamente','success-snack-bar')
        //////////
        return v.data
      })
    )

  }

  updateTransaction(data): Observable<Transaction>{
    return this.http.put<Response>(`${environment.API}${environment.routesCRUD.transactions}/${data.id}`, data).pipe(
      map( v => {
        this.getTransactions(1, 20, '', 'desc').pipe(take(1)).subscribe()
        //snacbarr
        this.openSnackBar('Actualizado correctamente','success-snack-bar')
        //////////
        return v.data
      })
    )

  }

  ///listar
  getTransactions(currentPage = 1, perPage = 20, filter = '', sort = 'desc'): Observable<ResponsePaginate> {
    return this.http.get<ResponsePaginate>(`${environment.API}${environment.routesCRUD.transactions}`, {
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
    ))
  }


  deleteTransaction(id){
    return this.http.delete<Response>(`${environment.API}${environment.routesCRUD.transactions}/${id}`).pipe(
      map( v => {
        // console.log(v.data);
        
        this.getTransactions(1, 20, '', 'desc').pipe(take(1)).subscribe()
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
