import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiFacturacionServiceService {
  private urlEnncio = ""
  private urlPdf = ""
  private token = ""

  

  constructor(private http:HttpClient) { }

  enviarOrden(orden: any): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.token}`
    });
  
    return this.http.post<any>(this.urlEnncio, orden, { headers });
  }
  recibirPdf(idFactura:string):Observable<Blob>
  {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.token}`
    });

    return this.http.get(`${this.urlPdf}/${idFactura}`,{headers,responseType:'blob'})
  }
}
