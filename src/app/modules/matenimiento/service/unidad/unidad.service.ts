import { Injectable } from '@angular/core';
import { CrudService } from 'src/app/modules/shared/services/crud.service';
import { RequestUnidad } from '../../models/unidad/p/unidad-request.model';
import { ResponseUnidad } from '../../models/unidad/p/unidad-response.model';
import { HttpClient } from '@angular/common/http';
import { urlConstants } from 'src/app/constants/url.constants';

@Injectable({
  providedIn: 'root'
})
export class UnidadService extends CrudService<RequestUnidad,ResponseUnidad> {

  constructor(
    protected http : HttpClient
  ) {
    super(http,urlConstants.Unidad)
   }
}
