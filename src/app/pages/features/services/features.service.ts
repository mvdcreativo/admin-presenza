import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpParams, HttpErrorResponse } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BehaviorSubject, Observable } from 'rxjs';
import { ResponsePaginate, Response } from 'src/app/shared/interfaces/response';
import { Feature, OptionSelect } from '../../products/interfaces/product';
import { map, take, catchError } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class FeaturesService {

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

  storeFeature(data): Observable<Feature>{
    return this.http.post<Response>(`${environment.API}${environment.routesCRUD.features}`, data).pipe(
      map( v => {
        this.getFeatures(1, 20, '', 'desc').pipe(take(1)).subscribe()
        //snacbarr
        this.openSnackBar('Se creó correctamente','success-snack-bar')
        //////////
        return v.data
      }),
      catchError(error => this.errorHandler(error))
    )

  }

  updateFeature(data): Observable<Feature>{
    return this.http.put<Response>(`${environment.API}${environment.routesCRUD.features}/${data.id}`, data).pipe(
      map( v => {
        this.getFeatures(1, 20, '', 'desc').pipe(take(1)).subscribe()
        //snacbarr
        this.openSnackBar('Actualizado correctamente','success-snack-bar')
        //////////
        return v.data
      }),
      catchError(error => this.errorHandler(error))
    )

  }

  ///listar
  getFeatures(currentPage = 1, perPage = 20, filter = '', sort = 'desc'): Observable<ResponsePaginate> {
    return this.http.get<ResponsePaginate>(`${environment.API}${environment.routesCRUD.features}`, {
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
    ),
      catchError(error => this.errorHandler(error))
    )
  }

  public getGroupFeatures(): Observable<Feature[]>{
    return this.http.get<Response>(`${environment.API}features_all`).pipe(
      map( v=> {
        return v.data.filter( (x:Feature) => x.features.length >=1 )
      })
    )
  }


  deleteFeature(id){
    return this.http.delete<Response>(`${environment.API}${environment.routesCRUD.features}/${id}`).pipe(
      map( v => {
        // console.log(v.data);
        
        this.getFeatures(1, 20, '', 'desc').pipe(take(1)).subscribe()
        //snacbarr
        this.openSnackBar('Eliminado correctamente','success-snack-bar')
        //////////
        return v.data
        
      }),
      catchError(error => this.errorHandler(error))
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

  errorHandler(error: HttpErrorResponse) {
    this.openSnackBar(error.message || "error en la solicitud.", 'error-snack-bar')
    return Observable.throw(error.message || "error en la solicitud.");
  }



}
