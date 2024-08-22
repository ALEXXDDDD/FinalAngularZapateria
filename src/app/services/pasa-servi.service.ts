import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../Pasarela/pasarela-module/enviorements/enviorements';

@Injectable({
  providedIn: 'root'
})
export class PasaServiService {

  constructor(private http:HttpClient) { }
  getOrdenDetalle(id:string): Observable<any>
  {
    return this.http.get(`${environment.api}/orders/${id}`)
  }
  sendPayment(token:string ,id:string):Promise<any>
  {
    return this.http.patch(`${environment.api}/orders/${id}`,
      {
        token
      }).toPromise()
  }
}
