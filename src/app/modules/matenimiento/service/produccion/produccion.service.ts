import { Injectable } from '@angular/core';
import { CrudService } from 'src/app/modules/shared/services/crud.service';
import { RequestVWProduccion } from '../../models/Produccion/produccion-requestVW.model';
import { ResponseProduccion } from '../../models/Produccion/produccion-response.model';
import { HttpClient } from '@angular/common/http';
import { urlConstants } from 'src/app/constants/url.constants';
import { RequestVWIngresoProducto } from '../../models/ingresoProducto/requestVWIngresoProducto.model';

@Injectable({
  providedIn: 'root'
})
export class ProduccionService  extends CrudService<RequestVWProduccion,ResponseProduccion>{

  constructor(
    protected  http:HttpClient
    ) {
    
      super(http,urlConstants.Produccion)
   }
}
