import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { urlConstants } from 'src/app/constants/url.constants';
import { RequestComprobanteDetalle } from 'src/app/modules/matenimiento/models/proveedor/requestRegistroPedidoProvedor.model';
import { ResponseProveedor } from 'src/app/modules/matenimiento/models/proveedor/responseProveedor.model';
import { CrudService } from 'src/app/modules/shared/services/crud.service';

@Injectable({
  providedIn: 'root'
})
export class ComprobanteDetalleService extends CrudService< RequestComprobanteDetalle,ResponseProveedor> {

  constructor(
    protected http:HttpClient
  ) { 
    super(http,urlConstants.comprobanteDetalle)
  }
 /*  getAll():Observable<ResponseCredito[]>{
    return this._http.get<ResponseCliente[]>(urlConstants.Cliente)
  }
  create(request:RequestCliente):Observable<RequestCliente>
  {
    return this._http.post<RequestCliente>(urlConstants.Cliente,request)
  }
  update(request:RequestCliente) :Observable<RequestCliente>
  {
    return this._http.put<RequestCliente>(urlConstants.Cliente,request)
  }
  delete(id:number):Observable<number>{
    return this._http.delete<number>(`${urlConstants.Cliente}${id}`);
  } */
}
