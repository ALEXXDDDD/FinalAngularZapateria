import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { urlConstants } from 'src/app/constants/url.constants';
import { ResponseProduccion } from 'src/app/modules/matenimiento/models/Produccion/produccion-response.model';
import { ResponseProducto } from 'src/app/modules/matenimiento/models/producto/producto-response.model';
import { VistPerfil } from './vistPerfil-model';
import { ResponseMaterial } from 'src/app/modules/matenimiento/models/material/material-response.model';
import { VistaMaterial } from './vistMaterial-model';
import { VistDetalle } from './vistDetalle-model';

@Injectable({
  providedIn: 'root'
})
export class VistaServiceService {

  constructor(private http:HttpClient ) { }

  nombreModelo(request: string): Observable<ResponseProducto[]> {
    return this.http.post<ResponseProducto[]>(`${urlConstants.traerVista}/nombreModelo`, request, {
      headers: { 'Content-Type': 'application/json' } // Asegúrate de que los encabezados son correctos
    });
  }

   perfil(request:string) : Observable<VistPerfil[]> 
   {
    
    return this.http.post<VistPerfil[]>(`${urlConstants.traerPerfil}`,request, {
      headers: { 'Content-Type': 'application/json' } // Asegúrate de que los encabezados son correctos
    });
   }
   detalleProducto(request:string) : Observable<VistDetalle[]> 
   {
    
    return this.http.post<VistDetalle[]>(`${urlConstants.traerPerfil}/detalle`,request, {
      headers: { 'Content-Type': 'application/json' } // Asegúrate de que los encabezados son correctos
    });
   }

   vistaProductoAcabado() : Observable<ResponseProducto[]> 
   {
    return this.http.get<ResponseProducto[]>(urlConstants.traerProductosAcabados);
   }
   vistaMaterialAcabado() : Observable<VistaMaterial[]> 
   {
    return this.http.get<VistaMaterial[]>(urlConstants.traerProductosAcabados);
   }

}
