import { Injectable } from '@angular/core';
import { CrudService } from 'src/app/modules/shared/services/crud.service';
import { ResponseVDetalleCredito } from '../../models/detalleCredito/detalleCreditoResponseVDCredito.model';
import { ResquestVDetalleCredito } from '../../models/detalleCredito/detalleCreditoRequestVDCredito.model';
import { HttpClient } from '@angular/common/http';
import { urlConstants } from 'src/app/constants/url.constants';

@Injectable({
  providedIn: 'root'
})
export class DetalleCreditoService extends CrudService<ResquestVDetalleCredito,ResponseVDetalleCredito> {

  constructor(
    protected http:HttpClient
  ) { 
    super(http,urlConstants.detalleCredito)
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