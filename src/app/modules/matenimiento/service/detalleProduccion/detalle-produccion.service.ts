import { Injectable } from '@angular/core';
import { CrudService } from 'src/app/modules/shared/services/crud.service';
import { RequestVWDetalleProduccion } from '../../models/DetalleProduccion/DetalleProduccion-requestVW.model';
import { ResponseVwDetalleProduccion } from '../../models/DetalleProduccion/DetallleProduccion-responseVW.model';
import { ResponseDetalleProduccion } from '../../models/DetalleProduccion/DetalleProduccion-response.model';
import { HttpClient } from '@angular/common/http';
import { urlConstants } from 'src/app/constants/url.constants';

@Injectable({
  providedIn: 'root'
})
export class DetalleProduccionService extends CrudService<RequestVWDetalleProduccion,ResponseVwDetalleProduccion> {

  constructor(
    protected http:HttpClient
  ) {
    super(http,urlConstants.DetalleProduccion)
   }

  getByCodigoProduccion(codigoProduccion: string) {
    const url = `${this.url_service}/Codigo-produccion?codigoProduccion=${encodeURIComponent(codigoProduccion)}`;
    return this._http.get<ResponseDetalleProduccion[]>(url);
  }
}
