import { Observable } from "rxjs";

export interface crudInterface<T,Y>
{
    /**
     * TODO: T=> REQUEST
     * Y => RESPONSE
     */
    getAll():  Observable<Y[]>;
    create(request:T) : Observable<Y>, 
    update(request:T) : Observable<Y>, 
    delete(id: number):Observable<number>
    //filtro
    //Creacion Multiple
    //Actualizacion Multiple 
   
  
}