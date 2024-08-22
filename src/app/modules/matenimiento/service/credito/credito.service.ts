import { Injectable } from '@angular/core';
import { RequestVCredito } from '../../models/credito/credito-requestVCredito.model';
import { ResponseVCredito } from '../../models/credito/credito-responseVCredito.model';
import { CrudService } from 'src/app/modules/shared/services/crud.service';
import { HttpClient } from '@angular/common/http';
import { urlConstants } from 'src/app/constants/url.constants';
import { RequestCredito } from '../../models/credito/credito-requestCredito.model';

@Injectable({
  providedIn: 'root'
})
export class CreditoService  extends CrudService<RequestCredito,ResponseVCredito> {

  constructor(
    protected http:HttpClient
  ) { 
    super(http,urlConstants.Credito)
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
