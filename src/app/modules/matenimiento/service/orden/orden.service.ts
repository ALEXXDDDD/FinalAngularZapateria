import { Injectable } from '@angular/core';


import { HttpClient } from '@angular/common/http';
import { urlConstants } from 'src/app/constants/url.constants';
import { CrudService } from 'src/app/modules/shared/services/crud.service';
import { RequestVWOrden } from '../../models/orden/orden-responseVWmodel';
import { ResponseOrden } from '../../models/orden/orden-response.model';
import { RequestFiltroNombre } from '../../models/requestFiltroNombre.model';
import { Observable } from 'rxjs';
import { ResponseListOrden } from '../../models/orden/orden-request.model';

@Injectable({
  providedIn: 'root'
})
export class OrdenService extends CrudService<RequestVWOrden,ResponseOrden> {

  constructor(
    protected http:HttpClient
  ) {
    super (http,urlConstants.Orden)
   }
   genericFiltrol(request:RequestFiltroNombre):Observable<ResponseListOrden[]>
   {
       return this._http.post<ResponseListOrden[]>(`${this.url_service}flitro`,request)
   }
}
