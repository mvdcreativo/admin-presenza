import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Feature } from 'src/app/pages/products/interfaces/product';
import { Response } from '../../interfaces/response';
import { environment } from 'src/environments/environment';
import { map, filter } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class FeatureService {

  constructor(
    private http: HttpClient
  ) { }


  public getFeatures(): Observable<Feature[]>{
    return this.http.get<Response>(`${environment.API}features_all`).pipe(
      map( v=> {
        return v.data.filter( (x:Feature) => x.features.length >=1 )
      })
    )
  }

}
