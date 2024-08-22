import { Injectable } from '@angular/core';
import { CrudService } from 'src/app/modules/shared/services/crud.service';
import { RequestProducto } from '../../models/producto/producto-request.model';
import { HttpClient } from '@angular/common/http';
import { urlConstants } from 'src/app/constants/url.constants';
import { ResponseProcedureProducto } from '../../models/producto/producto-responseProcedure.model';


@Injectable({
  providedIn: 'root'
})
export class VistProducAcabadoService extends CrudService<RequestProducto,ResponseProcedureProducto> {

  constructor(
    protected http:HttpClient
  ) {
    super (http,urlConstants.responseProductoStore)
   }
}