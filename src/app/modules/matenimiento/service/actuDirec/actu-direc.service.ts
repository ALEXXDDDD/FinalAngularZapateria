import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { urlConstants } from 'src/app/constants/url.constants';
import { ResponseVUsuario } from 'src/app/models/response-vwUsuario-model';
import { RequestActualizacionDireccion } from '../../models/cliente/request-actualizacionUsuario.model';
import { CrudService } from 'src/app/modules/shared/services/crud.service';
import { ResponseUsuario } from '../../models/usuario/responseUsuario.models';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ActuDirecService   {

  constructor(
    protected http:HttpClient,
  ) { 
    
  }
  update(request: RequestActualizacionDireccion): Observable<RequestActualizacionDireccion> {
    return this.http.put<RequestActualizacionDireccion>(urlConstants.actualizacionDireccion,request)
  }
  

}
