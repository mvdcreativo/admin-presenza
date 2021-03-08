import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { HttpClient, HttpParams, HttpErrorResponse } from '@angular/common/http';

import { environment } from "src/environments/environment";

import { Product, Response, ResponsePaginate, OptionSelect } from "../interfaces/product";
import { map, take, catchError } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';


@Injectable({
  providedIn: 'root'
})
export class ProductService {
 
  private productEditSubject$ : BehaviorSubject<Product> = new BehaviorSubject<Product>(null)
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
    // this.prueba = this.getProduct(107).subscribe()
  }

  get productOnEdit():Observable<Product>{
    return this.productEditSubject$
  }

  setProductOnEdit(value){
    this.productEditSubject$.next(value)
  }



  storeProduct(data): Observable<Product>{
    return this.http.post<Response>(`${environment.API}${environment.routesCRUD.products}`, data).pipe(
      map( v => {
        this.setProductOnEdit(v.data)
        //snacbarr
        this.openSnackBar('Se creó correctamente','success-snack-bar')
        //////////
        return v.data
      })
      
    )

  }

  updateProduct(data): Observable<Product>{
    const id = this.productEditSubject$.value.id
    data._method = "put";
    return this.http.post<Response>(`${environment.API}${environment.routesCRUD.products}/${id}`, data).pipe(
      map( v => {
        this.setProductOnEdit(v.data)
        //snacbarr
        this.openSnackBar('Actualizado correctamente','success-snack-bar')
        //////////
        return v.data
      })
      
    )

  }

  deleteProduct(id){
    return this.http.delete<Response>(`${environment.API}${environment.routesCRUD.products}/${id}`).pipe(
      map( v => {
        // console.log(v.data);
        
        this.getProducts(1, 20, '', 'desc').pipe(take(1)).subscribe()
        //snacbarr
        this.openSnackBar('Eliminado correctamente','success-snack-bar')
        //////////
        return v.data
        
      })
      
    )
  }
 

  getProduct(id) : Observable<Product>{
    return this.http.get<Response>(`${environment.API}${environment.routesCRUD.products}/${id}`).pipe(map(
      res => {
        this.setProductOnEdit(res.data)
        const resp = res.data
        return resp;
      }
    )
    
    )
  }


///listar
  getProducts(currentPage = 1, perPage = 20, filter='', sort= 'desc') : Observable<ResponsePaginate>{
    return this.http.get<ResponsePaginate>(`${environment.API}${environment.routesCRUD.products}`, {
      params: new HttpParams()
        .set('page', currentPage.toString())
        .set('filter', filter)
        .set('sort', sort)
        .set('per_page', perPage.toString())

    }).pipe(map(
      res => {
        console.log(res);
        
        this.setProductOnEdit(null)
        this.setItems(res)
        const resp = res
        return resp;
      }
    )
    
    )
  }

  public getOptionsSelect(): Observable<OptionSelect[]> {
    return this.http.get<OptionSelect[]>(this.urlUtils + 'forms.json')
  }


  getProductsUser(id) : Observable<Product[]>{
    return this.http.get<Response>(`${environment.API}${environment.routesCRUD.properties_user}/${id}`).pipe(map(
      res => {
        const resp = res.data
        return resp;
      }
    )
    
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
