import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { ResponsePaginate, Response } from 'src/app/shared/interfaces/response';
import { environment } from 'src/environments/environment';
import { User } from '../interfaces/user';
import { toFormData } from 'src/app/shared/utils/forms/to-form-data';
import { SlugService } from "src/app/shared/services/slug/slug.service";


@Injectable({
  providedIn: 'root'
})
export class UserService {

  private userEditSubject$ : BehaviorSubject<User> = new BehaviorSubject<User>(null)
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
    private snackBar: MatSnackBar,
    private slugService: SlugService
  ) { 
    // this.prueba = this.getUser(107).subscribe()
  }
  get userOnEdit():Observable<User>{
    return this.userEditSubject$
  }

  setUserOnEdit(value){
    this.userEditSubject$.next(value)
  }


  storeUser(data): Observable<User>{
    const dataForm = toFormData(data);
    const name_last_name= `${data.name} ${data.last_name}`
    dataForm.append('slug', this.slugService.create(name_last_name) )
    return this.http.post<Response>(`${environment.API}${environment.routesCRUD.users}`, dataForm).pipe(
      map( v => {
        this.setUserOnEdit(v.data)
        //snacbarr
        this.openSnackBar('Se creó correctamente','success-snack-bar')
        //////////
        return v.data
      })
      
    )

  }

  updateUser(data): Observable<User>{
    const id = this.userEditSubject$.value.id
    const dataForm = toFormData(data);
    const name_last_name= `${data.name} ${data.last_name}`
    dataForm.append('slug', this.slugService.create(name_last_name) )
    dataForm.append("_method", "put");

    return this.http.post<Response>(`${environment.API}${environment.routesCRUD.users}/${id}`, dataForm).pipe(
      map( v => {
        this.setUserOnEdit(v.data)
        //snacbarr
        this.openSnackBar('Actualizado correctamente','success-snack-bar')
        //////////
        return v.data
      })
      
    )

  }



  getUser(id) : Observable<User>{
    return this.http.get<Response>(`${environment.API}${environment.routesCRUD.users}/${id}`).pipe(map(
      res => {
        this.setUserOnEdit(res.data)
        const resp = res.data
        return resp;
      }
    )
    
    )
  }



  ///listar
  getUsers(currentPage = 1, perPage = 20, filter='', sort= 'desc', include = null) : Observable<ResponsePaginate>{
    return this.http.get<ResponsePaginate>(`${environment.API}${environment.routesCRUD.users}`, {
      params: new HttpParams()
        .set('page', currentPage.toString())
        .set('filter', filter)
        .set('sort', sort)
        .set('per_page', perPage.toString())
        .set('with', include.toString())


    }).pipe(map(
      res => {
        console.log(res);
        
        this.setUserOnEdit(null)
        this.setItems(res)
        const resp = res
        return resp;
      }
    )
    
    )
  }

  getUsersOwner(currentPage = 1, perPage = 20, filter='', sort= 'desc') : Observable<ResponsePaginate>{
    return this.http.get<ResponsePaginate>(`${environment.API}owner_users`, {
      params: new HttpParams()
        .set('page', currentPage.toString())
        .set('filter', filter)
        .set('sort', sort)
        .set('per_page', perPage.toString())

    }).pipe(map(
      res => {
        console.log(res);
        
        const resp = res
        return resp;
      }
    )
    
    )
  }

  deleteUser(id){
    return this.http.delete<Response>(`${environment.API}${environment.routesCRUD.users}/${id}`).pipe(
      map( v => {
        // console.log(v.data);
        
        this.getUsers(1, 20, '', 'desc').pipe(take(1)).subscribe()
        //snacbarr
        this.openSnackBar('Eliminado correctamente','success-snack-bar')
        //////////
        return v.data
        
      })
      
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
  
}
