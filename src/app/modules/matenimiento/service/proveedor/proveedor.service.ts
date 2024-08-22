import { Injectable } from '@angular/core';
import { RequestVWProveedor } from '../../models/proveedor/requestVWProveedor.model';
import { ResponseProveedor } from '../../models/proveedor/responseProveedor.model';
import { HttpClient } from '@angular/common/http';
import { urlConstants } from 'src/app/constants/url.constants';
import { CrudService } from 'src/app/modules/shared/services/crud.service';

@Injectable({
  providedIn: 'root'
})
export class ProveedorService  extends CrudService<RequestVWProveedor,ResponseProveedor> {

  constructor(
    protected  http:HttpClient
    ) {
    
      super(http,urlConstants.Proveedor)
   }
}
