import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { urlConstants } from 'src/app/constants/url.constants';

import { ResponseRol } from '../models/rol/rol-response.model';
import { RequestRol } from '../models/rol/rol-request.model';
import { CrudService } from '../../shared/services/crud.service';


@Injectable({
  providedIn: 'root'
})
export class RolService  extends CrudService<RequestRol,ResponseRol>{

  constructor(
    protected  http:HttpClient
    ) {
    
      super(http,urlConstants.rol)
   }

   
   /**
    * Genracion de los CRUDS 
    */
   /* getAll():Observable<ResponseRol[]>
   { */
    /* let auth_token = sessionStorage.getItem("token")
    const jwtHeaders= new HttpHeaders(
      {
        'Content-Type':'application/json',
        'Authorization': `Bearer ${auth_token}`
      } */
    
    /* return this._http.get<ResponseRol[]>(urlConstants.rol,{headers:jwtHeaders}) */
    /* return this._http.get<ResponseRol[]>(urlConstants.rol)

    
   } */
   /* create(request:RequestRol) : Observable<ResponseRol> 
   {
    
    return this._http.post<ResponseRol>(urlConstants.rol,request);
   }
   update(request:RequestRol) : Observable<ResponseRol> 
   {
    return this._http.put<ResponseRol>(urlConstants.rol, request);
   }
   delete(id: number):Observable<number>
   {
    return this._http.delete<number>(`${urlConstants.rol}${id}`);
   } */
  

}
