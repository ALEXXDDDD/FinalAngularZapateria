import { Inject, Injectable, inject } from '@angular/core';
import { crudInterface } from '../interface/crud-interface';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { RequestFilterGeneric } from '../../matenimiento/models/genericFilterRequest.model';
import { ResponseFilterGeneric } from '../../matenimiento/models/genericFilterResponse.models';

@Injectable({
  providedIn: 'root'
})
/**
 * TODO: Implementacion del CRUD Generico 
 * T => Request
 * Y => Response
 */
export class CrudService<T,Y> implements crudInterface <T,Y> {

  constructor(
    protected _http : HttpClient,
    @Inject('url_service') public url_service:string // Inyeccion de Dpendencias
    
  ) { }
  /**
   * TODO: Se obtiene La lista de la tabla 
   */
  getAll(): Observable<Y[]> {
    return this._http.get<Y[]>(this.url_service)
  }
  // getById(id:number):Observable<Y[]>{
  //   return this._http.get<Y[]>(`${this.url_service}/${id}`)
  // }
  create(request: T): Observable<Y> {
    return this._http.post<Y>(this.url_service,request)
  }
  update(request: T): Observable<Y> {
    return this._http.put<Y>(this.url_service,request)
  }
  delete(id: number): Observable<number> {
    return this._http.delete<number>(`${this.url_service}${id}`);
  }
  genericFilter(request:RequestFilterGeneric):Observable<ResponseFilterGeneric<Y>>
  {
    return this._http.post<ResponseFilterGeneric<Y>>(`${this.url_service}/filter`,request)
  }
}
