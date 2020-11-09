import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { ResponsePaginate, Response } from '../../interfaces/response';
import { SlugService } from '../slug/slug.service';
import { Expense } from "src/app/shared/interfaces/expense";

@Injectable({
  providedIn: 'root'
})
export class ExpensesService {

  constructor(
    private http: HttpClient,
    private snackBar: MatSnackBar
  ) { }



  private user_id$: BehaviorSubject<any> = new BehaviorSubject(null)
  private resultSubject$: BehaviorSubject<ResponsePaginate> = new BehaviorSubject(null)
  public get resultItems$() {
    return this.resultSubject$
  }
  public setItems(value) {
    this.resultSubject$.next(value)
  }
  public setUserEdit(value){
    this.user_id$.next(value)
  }

  storeExpense(data): Observable<Expense>{
    return this.http.post<Response>(`${environment.API}${environment.routesCRUD.expenses}`, data).pipe(
      map( v => {
        this.getExpenses(1, 20, '', 'desc').pipe(take(1)).subscribe()
        //snacbarr
        this.openSnackBar('Se creó correctamente','success-snack-bar')
        //////////
        return v.data
      })
    )

  }

  updateExpense(data): Observable<Expense>{
    return this.http.put<Response>(`${environment.API}${environment.routesCRUD.expenses}/${data.id}`, data).pipe(
      map( v => {
        this.getExpenses(1, 20, '', 'desc').pipe(take(1)).subscribe()
        //snacbarr
        this.openSnackBar('Actualizado correctamente','success-snack-bar')
        //////////
        return v.data
      })
    )

  }

  ///listar
  getExpenses(currentPage = 1, perPage = 20, filter = '', sort = 'desc'): Observable<ResponsePaginate> {

    

    return this.http.get<ResponsePaginate>(`${environment.API}${environment.routesCRUD.expenses}`, {
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

  storeExpensePrpertyUser(data): Observable<any>{
    return this.http.post<Response>(`${environment.API}expenses_properties_users`, data).pipe(
      map( v => {
        this.getExpensesUser(1, 20, '', 'desc').pipe(take(1)).subscribe()
        //snacbarr
        this.openSnackBar('Se creó correctamente','success-snack-bar')
        //////////
        return v.data
      })
    )

  }
  updateExpensePrpertyUser(data): Observable<any>{
    return this.http.put<Response>(`${environment.API}expenses_properties_users/${data.id}`, data).pipe(
      map( v => {
        this.getExpensesUser(1, 20, '', 'desc').pipe(take(1)).subscribe()
        //snacbarr
        this.openSnackBar('Actualizado correctamente','success-snack-bar')
        //////////
        return v.data
      })
    )

  }
  getExpensesUser(currentPage = 1, perPage = 20, filter = '', sort = 'desc'): Observable<ResponsePaginate> {

    let user_id = this.user_id$.value

    return this.http.get<ResponsePaginate>(`${environment.API}expenses_properties_users/user/${user_id}`, {
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

  deleteExpenseUser(id){
    return this.http.delete<Response>(`${environment.API}expenses_properties_users/${id}`).pipe(
      map( v => {
        // console.log(v.data);
        
        this.getExpensesUser(1, 20, '', 'desc').pipe(take(1)).subscribe()
        //snacbarr
        this.openSnackBar('Eliminado correctamente','success-snack-bar')
        //////////
        return v.data
        
      })
    )
  }


  deleteExpense(id){
    return this.http.delete<Response>(`${environment.API}${environment.routesCRUD.expenses}/${id}`).pipe(
      map( v => {
        // console.log(v.data);
        
        this.getExpenses(1, 20, '', 'desc').pipe(take(1)).subscribe()
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
