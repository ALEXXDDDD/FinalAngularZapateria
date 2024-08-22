import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { urlConstants } from 'src/app/constants/url.constants';
import { ResponseCliente } from '../../models/cliente/cliente-response.model';
import { RequestCliente } from '../../models/cliente/cliente-request.model';
import { CrudService } from 'src/app/modules/shared/services/crud.service';
import { RequestVWCliente } from '../../models/cliente/request-VWCliente.model';
import { ResponseVWCliente } from '../../models/cliente/response-VMCliente.model';

@Injectable({
  providedIn: 'root'
})
export class ClienteService extends CrudService<RequestVWCliente,ResponseVWCliente> {

  constructor(
    protected http:HttpClient
  ) { 
    super(http,urlConstants.Cliente)
  }
 /*  getAll():Observable<ResponseCliente[]>{
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
