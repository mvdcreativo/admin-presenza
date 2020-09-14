import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Status } from "src/app/shared/interfaces/status";
import { Response } from "src/app/shared/interfaces/response";


import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class StatusService {

  constructor(
    private http: HttpClient
  ) { }


  getStatus(forElement?):Observable<Status[]>{
    return this.http.get<Response>(`${environment.API}statuses?for_element=${forElement}`).pipe(
      map(v => v.data)
    )
  }
}
