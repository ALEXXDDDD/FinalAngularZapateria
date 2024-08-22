import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { urlConstants } from 'src/app/constants/url.constants';
import { RequestVWEmpleado } from '../../models/empleado/empleado-request.model';
import { ResponseEmpleado } from '../../models/empleado/response-list-empleado.models';
import { CrudService } from 'src/app/modules/shared/services/crud.service';
import { ResponseVWEmpleado } from '../../models/empleado/empleadoVW-response.model';
import { empleadoApiPeru } from '../../models/empleado/empleadoApisPero.model';


@Injectable({
  providedIn: 'root'
})
export class EmpleadoService extends CrudService<RequestVWEmpleado,ResponseEmpleado> {

  constructor(
    protected http:HttpClient
  ) {
      super(http,urlConstants.Empleado)
   }
   buscarEmpleadoDNI(dni:string):Observable<empleadoApiPeru>
   {
     let urlApisPeru = "https://dniruc.apisperu.com/api/v1/dni/DNI##?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJlbWFpbCI6ImFzdWhhc25hdmFyc3VhcmV6d0BnbWFpbC5jb20ifQ.fb-pelYw24XgU96jk23og2jOGvHGUn8Z-wllJ3oBenk"
     urlApisPeru = urlApisPeru.replace("DNI##",dni);
     return this.http.get<empleadoApiPeru>(urlApisPeru)
   }
   /* getAll():Observable<ResponseEmpleado[]>
   {
    return this._http.get<ResponseEmpleado[]>(urlConstants.Empleado)
   } */
   /* Create(request:RequestVWEmpleado):Observable<RequestVWEmpleado>
   {
    return this._http.post<ResponseEmpleado>(urlConstants.Empleado,request);
   }
   Update(request:RequestVWEmpleado):Observable<RequestVWEmpleado>
   {
    return this._http.put<ResponseEmpleado>(urlConstants.Empleado, request)
   } */
  /*  Delete(id:number)
   {
    return this._http.delete<number>(`${urlConstants.Empleado}${id}`)
   } */
}
