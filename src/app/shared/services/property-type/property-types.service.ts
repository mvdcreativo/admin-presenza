import { Injectable } from '@angular/core';
import { PropertyTypes } from 'src/app/pages/products/interfaces/product';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Response, ResponsePaginate } from '../../interfaces/response';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PropertyTypesService {

  constructor(
    public http: HttpClient
  ) { }

  getPropertyTypes():Observable<PropertyTypes[]>{
    return this.http.get<ResponsePaginate>(`${environment.API}property_types`).pipe(
      map(v=> v.data.data)
    )

  }
}
