import { Injectable } from '@angular/core';
import { CrudService } from 'src/app/modules/shared/services/crud.service';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { urlConstants } from 'src/app/constants/url.constants';
import { RequestProducto } from '../../models/producto/producto-request.model';
import { ResponseProducto } from '../../models/producto/producto-response.model';
import { ResponseVDetalleProducto } from '../../models/producto/producto-responseVDetalle.model';
import { ResponseDetalleProducto } from '../../models/producto/producto-responseDetalleProducto.model';
import { RequestFiltroNombre } from '../../models/requestFiltroNombre.model';
import { Producto } from './producto-response.model';
@Injectable({
  providedIn: 'root'
})
export class ProductoService extends CrudService<RequestProducto,ResponseProducto> {

  constructor(
    protected http:HttpClient
  ) {
    super (http,urlConstants.producto)
   }

   
   getById(id:number):Observable<ResponseDetalleProducto[]>{
    debugger;
    return this._http.get<ResponseDetalleProducto[]>(`${this.url_service}/${id}`)
  }
  genericFiltrol(request:RequestFiltroNombre):Observable<ResponseProducto[]>
  {
      return this._http.post<ResponseProducto[]>(`${this.url_service}/flitro`,request)
  }
  filtroProductoAcabado():Observable<Producto[]>
  {
      return this._http.get<Producto[]>(`${this.url_service}/productos-acabados`)
  }
}
