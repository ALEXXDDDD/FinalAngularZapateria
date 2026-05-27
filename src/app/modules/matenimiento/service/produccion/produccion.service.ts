import { Injectable } from '@angular/core';
import { CrudService } from 'src/app/modules/shared/services/crud.service';
import { RequestVWProduccion } from '../../models/Produccion/produccion-requestVW.model';
import { ResponseProduccion } from '../../models/Produccion/produccion-response.model';
import { HttpClient } from '@angular/common/http';
import { urlConstants } from 'src/app/constants/url.constants';
import { RequestVWIngresoProducto } from '../../models/ingresoProducto/requestVWIngresoProducto.model';
import { ResponseVProduccion } from '../../models/Produccion/responseProduccion.model';
import { Observable } from 'rxjs';
import { RequestFiltroNombre } from '../../models/requestFiltroNombre.model';
import { ResponseVWProduccion } from '../../models/Produccion/produccion-reponseVW.model';

@Injectable({
  providedIn: 'root'
})
export class ProduccionService  extends CrudService<RequestVWProduccion,ResponseProduccion>{

  constructor(
    protected  http:HttpClient
    ) {
    
      super(http,urlConstants.Produccion)
   }
   GetProduccion():Observable<ResponseVProduccion[]>
   {
       return this._http.get<ResponseVProduccion[]>(`${this.url_service}/SinAcciones`)
   }
   genericFiltroProduccionActivo(request:RequestFiltroNombre):Observable<ResponseVWProduccion[]>
   {
       return this._http.post<ResponseVWProduccion[]>(`${this.url_service}/filtro-activos`,request)
   }
}
