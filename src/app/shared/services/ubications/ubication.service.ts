import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

import { State, City, Municipality, Neighborhood } from "src/app/shared/interfaces/ubication";
import { map } from 'rxjs/operators';
import { Response, ResponsePaginate } from 'src/app/shared/interfaces/response';

@Injectable({
  providedIn: 'root'
})
export class UbicationService {
  public apiKey = environment.API_KEY_GM;

  constructor(
    private http:HttpClient
  ) { }


  public getStates(): Observable<State[]> {
    return this.http.get<ResponsePaginate>(environment.API + 'provinces').pipe(
      map( v => v.data.data)
    );
  }

  public getCities(): Observable<City[]> {
    return this.http.get<ResponsePaginate>(environment.API + 'cities').pipe(
      map( v => v.data.data)
    );;
  }
  public getMunicipality(): Observable<Municipality[]> {
    return this.http.get<ResponsePaginate>(environment.API + 'municipalities').pipe(
      map( v => v.data.data)
    );
  }

  public getNeighborhoods(): Observable<Neighborhood[]> {
    return this.http.get<ResponsePaginate>(environment.API + 'neighborhoods').pipe(
      map( v => v.data.data)
    );
  }


  ////maps

}
