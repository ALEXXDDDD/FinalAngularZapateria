import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { urlConstants } from 'src/app/constants/url.constants';
import { ResponseDetalleProcedureProducto } from '../../models/producto/productoResponseDetalle.model';

@Injectable({
  providedIn: 'root'
})
export class DetalleProductoService {

  constructor(

    protected  _http:HttpClient
  ) { }

  getDetalle(id: number):Observable<ResponseDetalleProcedureProducto[]>
   {
    return this._http.get<ResponseDetalleProcedureProducto[]>(`${urlConstants.verDetalleProducto}/${id}`);
   }
}
