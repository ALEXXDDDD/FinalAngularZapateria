import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ResponsePersona } from '../../models/persona/response-persona.model';
import { urlConstants } from 'src/app/constants/url.constants';
import { RequestPersona } from '../../models/persona/persona-request.model';
import { CrudService } from 'src/app/modules/shared/services/crud.service';
import { empleadoApiPeru } from '../../models/empleado/empleadoApisPero.model';

@Injectable({
  providedIn: 'root'
})
export class PersonaService extends CrudService<RequestPersona,ResponsePersona> {

  constructor(
    protected http:HttpClient
  ) { 
    super(http,urlConstants.persona)
  }
 
  /* getAll():Observable<ResponsePersona[]>{
    return this._http.get<ResponsePersona[]>(urlConstants.persona)
  }
  create(request:RequestPersona):Observable<RequestPersona>
  {
    return this._http.post<RequestPersona>(urlConstants.persona,request)
  }
  update(request:RequestPersona) :Observable<RequestPersona>
  {
    return this._http.put<RequestPersona>(urlConstants.persona,request)
  }
  delete(id:number):Observable<number>{
    return this._http.delete<number>(`${urlConstants.persona}${id}`);
  } */
}
