import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpErrorResponse } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { map, filter, take, catchError } from 'rxjs/operators';
import { ResponsePaginate, Response } from 'src/app/shared/interfaces/response';
import { Observable, BehaviorSubject } from 'rxjs';
import { ModalLocationsComponent } from 'src/app/shared/components/modals/modal-locations/modal-locations.component';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';



@Injectable({
  providedIn: 'root'
})
export class LocationService {

  private resultSubject$: BehaviorSubject<ResponsePaginate> = new BehaviorSubject(null)
  public get resultItems$() {
    return this.resultSubject$
  }
  public setItems(value) {
    this.resultSubject$.next(value)
  }


  constructor(
    private http: HttpClient,
    public dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {

  }


  getItems(currentPage = 1, perPage = 20, filter = '', sort = 'desc', crudClient): Observable<ResponsePaginate> {
    return this.http.get<ResponsePaginate>(`${environment.API + environment.routesCRUD[crudClient]}`, {
      params: new HttpParams()
        .set('page', currentPage.toString())
        .set('filter', filter)
        .set('sort', sort)
        .set('per_page', perPage.toString())

    }).pipe(map(
      res => {
        const resp = res
        this.setItems(resp)
        return resp;
      }
    ),
    catchError(err => this.errorHandler(err)))
  }


  private storeLocation(data, crudClient): Observable<Response> {
    return this.http.post<Response>(`${environment.API + environment.routesCRUD[crudClient]}`, data).pipe(
      map(v => {
        console.log(v.data);
        this.getItems(1, 20, '', 'desc', crudClient).pipe(take(1)).subscribe()
        //snacbarr
        this.openSnackBar('Se creó correctamente','success-snack-bar')
        //////////
        return v.data
      }),
      catchError(error => this.errorHandler(error))
    )
  }


  public deleteLocation(id, crudClient): Observable<Response> {
    return this.http.delete<Response>(`${environment.API + environment.routesCRUD[crudClient]}/${id}`).pipe(
      map(v => {
        console.log(v.data);
        this.getItems(1, 20, '', 'desc', crudClient).pipe(take(1)).subscribe()
        //snacbarr
        this.openSnackBar('Eliminado correctamente','success-snack-bar')
        //////////
        return v
      }
      ),
      catchError(error => this.errorHandler(error))
    )
  }

  private updateLocation(id,data, crudClient): Observable<Response> {
    return this.http.put<Response>(`${environment.API + environment.routesCRUD[crudClient]}/${id}`, data).pipe(
      map(v => {
        console.log(v.data);
        this.getItems(1, 20, '', 'desc', crudClient).pipe(take(1)).subscribe()
        //snacbarr
        this.openSnackBar('Actualizado correctamente','success-snack-bar')
        //////////
        return v.data
      }),
      catchError(error => this.errorHandler(error))
    )
  }



  /////////dialog/modal

  openDialog(typeLocation?: string, elementEdit?) {
    const dialogRef = this.dialog.open(ModalLocationsComponent, {
      width: '850px',
      data: {typeLocation: typeLocation, elementEdit: elementEdit}
    });
    console.log(elementEdit);
    

    return dialogRef.afterClosed().subscribe(result => {
      // this.animal = result;
      if (result?.data && result?.location_type) {
        console.log(result);
        if(elementEdit){
          this.updateLocation(elementEdit.id, result.data, result.location_type).pipe(take(1)).subscribe()
        }else{
          this.storeLocation(result.data, result.location_type).pipe(take(1)).subscribe()

        }
      }

    });
  }
  /////////////////


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
