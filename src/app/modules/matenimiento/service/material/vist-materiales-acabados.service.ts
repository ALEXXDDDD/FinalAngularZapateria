import { Injectable } from '@angular/core';
import { CrudService } from 'src/app/modules/shared/services/crud.service';
import { RequestProducto } from '../../models/producto/producto-request.model';
import { HttpClient } from '@angular/common/http';
import { urlConstants } from 'src/app/constants/url.constants';
import { ResponseProcedureMaterial } from '../../models/material/material-responseStore.model';

@Injectable({
  providedIn: 'root'
})
export class VistMaterialesAcabadosService extends CrudService<RequestProducto,ResponseProcedureMaterial> {

  constructor(
    protected http:HttpClient
  ) {
    super (http,urlConstants.responseMaterialStore)
   }
}
