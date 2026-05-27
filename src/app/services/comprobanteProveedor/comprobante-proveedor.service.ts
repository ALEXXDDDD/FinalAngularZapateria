import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { urlConstants } from 'src/app/constants/url.constants';
import { RequestComprobanteProveedor } from 'src/app/modules/matenimiento/models/proveedor/requestPedidoProveedor.model';
import { ResponseProveedor } from 'src/app/modules/matenimiento/models/proveedor/responseProveedor.model';
import { ResponseVWProveedor } from 'src/app/modules/matenimiento/models/proveedor/responseVWProveedor.model';
import { CrudService } from 'src/app/modules/shared/services/crud.service';

@Injectable({
  providedIn: 'root'
})
export class ComprobanteProveedorService extends CrudService< RequestComprobanteProveedor,ResponseProveedor> {

  constructor(
    protected http:HttpClient
  ) { 
    super(http,urlConstants.comprobanteProveedor)
  }
  getAllProveedorPedido():Observable<ResponseVWProveedor[]>
  {
      return this._http.get<ResponseVWProveedor[]>(`${this.url_service}/proveedor-pedido`)
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
