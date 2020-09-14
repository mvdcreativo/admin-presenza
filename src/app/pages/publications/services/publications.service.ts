import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient, HttpParams, HttpErrorResponse } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ResponsePaginate, Response } from 'src/app/shared/interfaces/response';

import { Publication } from "../interfaces/publication";
import { environment } from 'src/environments/environment';
import { map, catchError, take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PublicationsService {

  private publicationEditSubject$ : BehaviorSubject<Publication> = new BehaviorSubject<Publication>(null)
  private urlUtils = "src/app/shared/utils/data/";

  private resultSubject$: BehaviorSubject<ResponsePaginate> = new BehaviorSubject(null)
  public get resultItems$() {
    return this.resultSubject$
  }
  public setItems(value) {
    this.resultSubject$.next(value)
  }

  
  constructor(
    private http:HttpClient,
    private snackBar: MatSnackBar
  ) { 
    // this.prueba = this.getPublication(107).subscribe()
  }
  get publicationOnEdit():Observable<Publication>{
    return this.publicationEditSubject$
  }

  setPublicationOnEdit(value){
    this.publicationEditSubject$.next(value)
  }


  storePublication(data): Observable<Publication>{
    return this.http.post<Response>(`${environment.API}${environment.routesCRUD.publications}`, data).pipe(
      map( v => {
        this.setPublicationOnEdit(v.data)
        //snacbarr
        this.openSnackBar('Se creó correctamente','success-snack-bar')
        //////////
        return v.data
      }),
      catchError(error => this.errorHandler(error))
    )

  }

  updatePublication(data): Observable<Publication>{
    const id = this.publicationEditSubject$.value.id
    // data._method = "put";
    return this.http.put<Response>(`${environment.API}${environment.routesCRUD.publications}/${id}`, data).pipe(
      map( v => {
        this.setPublicationOnEdit(v.data)
        //snacbarr
        this.openSnackBar('Actualizado correctamente','success-snack-bar')
        //////////
        return v.data
      }),
      catchError(error => this.errorHandler(error))
    )

  }



  getPublication(id) : Observable<Publication>{
    return this.http.get<Response>(`${environment.API}${environment.routesCRUD.publications}/${id}`).pipe(map(
      res => {
        this.setPublicationOnEdit(res.data)
        const resp = res.data
        return resp;
      }
    ),
    catchError(error => this.errorHandler(error))
    )
  }



  ///listar
  getPublications(currentPage = 1, perPage = 20, filter='', sort= 'desc') : Observable<ResponsePaginate>{
    return this.http.get<ResponsePaginate>(`${environment.API}${environment.routesCRUD.publications}`, {
      params: new HttpParams()
        .set('page', currentPage.toString())
        .set('filter', filter)
        .set('sort', sort)
        .set('per_page', perPage.toString())

    }).pipe(map(
      res => {
        console.log(res);
        
        this.setPublicationOnEdit(null)
        this.setItems(res)
        const resp = res
        return resp;
      }
    ),
    catchError(error => this.errorHandler(error))
    )
  }

  deletePublication(id){
    return this.http.delete<Response>(`${environment.API}${environment.routesCRUD.publications}/${id}`).pipe(
      map( v => {
        // console.log(v.data);
        
        this.getPublications(1, 20, '', 'desc').pipe(take(1)).subscribe()
        //snacbarr
        this.openSnackBar('Eliminado correctamente','success-snack-bar')
        //////////
        return v.data
        
      }),
      catchError(error => this.errorHandler(error))
    )
  }

  openSnackBar(message: string, refClass:string, action: string = '') {
    this.snackBar.open(message, action, {
      duration: 1000,
      horizontalPosition: 'center',
      verticalPosition: 'top',
      panelClass: refClass 
    });
  }
  
  errorHandler(error: HttpErrorResponse) {
    this.openSnackBar(error.message || "error en la solicitud.",'error-snack-bar')
    return Observable.throw(error.message || "error en la solicitud.");
  }
}
