import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { urlConstants } from 'src/app/constants/url.constants';
import { CrudService } from 'src/app/modules/shared/services/crud.service';
import { RequestIngresoProducto } from '../../models/ingreso-producto/ingreso-producto-request.model';
import { ResponseVIngresoProducto } from '../../models/ingreso-producto/ingreso-producto-response.model';

@Injectable({
  providedIn: 'root'
})
export class IngresoProductoService extends CrudService<RequestIngresoProducto,ResponseVIngresoProducto> {

  constructor(
    protected http:HttpClient
  ) {
      super(http,urlConstants.IngresoProducto)
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

