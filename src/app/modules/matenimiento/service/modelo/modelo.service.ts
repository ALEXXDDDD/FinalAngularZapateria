import { Injectable } from '@angular/core';
import { CrudService } from 'src/app/modules/shared/services/crud.service';
import { RequestModelo } from '../../models/modelo/modelo-request.model';
import { ResponseModelo } from '../../models/modelo/modelo-response.model';
import { HttpClient } from '@angular/common/http';
import { urlConstants } from 'src/app/constants/url.constants';

@Injectable({
  providedIn: 'root'
})
export class ModeloService extends CrudService<RequestModelo,ResponseModelo>{

  constructor(
    protected http:HttpClient
  ) { 
    super (http,urlConstants.Modelo)
  }
}
